import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, getSession } from "@/lib/auth";
import { unauthorized, forbidden, badRequest, serverError } from "@/lib/api";
import { validateUserEmail } from "@/lib/email";
import { validateName, validatePassword } from "@/lib/userValidation";

async function requireAdminSession() {
  const session = await getSession();
  if (!session) return { error: unauthorized() };
  if (session.role !== "ADMIN") return { error: forbidden() };
  return { session };
}

// GET /api/users  (admin)
export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(users);
}

// POST /api/users  (admin) -> create editor/admin
export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const { name, email, password, role } = (await req.json()) as {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    };
    if (!name || !email || !password) {
      return badRequest("Name, email and password are required.");
    }
    const nameError = validateName(name);
    if (nameError) return badRequest(nameError);
    const emailError = validateUserEmail(email);
    if (emailError) return badRequest(emailError);
    const pwError = validatePassword(password);
    if (pwError) return badRequest(pwError);

    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();

    // Enforce uniqueness (name is case-insensitive; email is unique in the DB).
    const dupeName = await prisma.user.findFirst({
      where: { name: { equals: cleanName, mode: "insensitive" } },
    });
    if (dupeName) return badRequest("That name is already taken. Please use a different name.");

    const dupeEmail = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (dupeEmail) return badRequest("A user with this email already exists.");

    const user = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        passwordHash: await hashPassword(password),
        role: role === "ADMIN" ? "ADMIN" : "EDITOR",
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (e: unknown) {
    console.error(e);
    if (e && typeof e === "object" && "code" in e && (e as { code?: string }).code === "P2002") {
      return badRequest("A user with this email already exists.");
    }
    return serverError();
  }
}
