import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, getSession } from "@/lib/auth";
import { unauthorized, forbidden, badRequest, notFound, serverError } from "@/lib/api";
import { validateUserEmail } from "@/lib/email";
import { validateName, validatePassword } from "@/lib/userValidation";

async function requireAdminSession() {
  const session = await getSession();
  if (!session) return { error: unauthorized() };
  if (session.role !== "ADMIN") return { error: forbidden() };
  return { session };
}

// PUT /api/users/[id]  (admin) -> update name/email/role and optional password
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;

  try {
    const { name, email, password, role } = (await req.json()) as {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    };
    const data: Record<string, unknown> = {};
    if (name) {
      const nameError = validateName(name);
      if (nameError) return badRequest(nameError);
      const cleanName = name.trim();
      const dupeName = await prisma.user.findFirst({
        where: { name: { equals: cleanName, mode: "insensitive" }, NOT: { id } },
      });
      if (dupeName) return badRequest("That name is already taken. Please use a different name.");
      data.name = cleanName;
    }
    if (email) {
      const emailError = validateUserEmail(email);
      if (emailError) return badRequest(emailError);
      data.email = email.toLowerCase().trim();
    }
    if (role) data.role = role === "ADMIN" ? "ADMIN" : "EDITOR";
    if (password) {
      const pwError = validatePassword(password);
      if (pwError) return badRequest(pwError);
      data.passwordHash = await hashPassword(password);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return NextResponse.json(user);
  } catch (e: unknown) {
    console.error(e);
    if (e && typeof e === "object" && "code" in e) {
      const code = (e as { code?: string }).code;
      if (code === "P2002") return badRequest("A user with this email already exists.");
      if (code === "P2025") return notFound();
    }
    return serverError();
  }
}

// DELETE /api/users/[id]  (admin) -> delete, but never the last admin / yourself
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { session, error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;

  if (session && session.sub === id) {
    return badRequest("You cannot delete your own account while logged in.");
  }

  try {
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) return notFound();
    if (target.role === "ADMIN") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) return badRequest("Cannot delete the last admin account.");
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return serverError();
  }
}
