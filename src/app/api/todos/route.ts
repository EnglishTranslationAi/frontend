import {NextResponse} from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"

export async function GET() {
  return NextResponse.json({
      hello:'world'
  })
}