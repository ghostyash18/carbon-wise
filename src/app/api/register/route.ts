import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // MOCK REGISTRATION: Simulate network delay and return success
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      message: "User registered successfully",
      user: { id: "mock-id", email, name }
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    )
  }
}
