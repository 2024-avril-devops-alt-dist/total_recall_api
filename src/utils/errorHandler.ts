import { NextResponse } from "next/server";
import { NotFoundError, ValidationError, ForbiddenError } from "@/utils/errors";
import logger from "@/lib/logger";

export function handleError(error: any, message = "Internal Server Error") {
  logger.error(error);

  if (error instanceof NotFoundError) {
    return NextResponse.json(
      { error: error.message || "Not found" },
      { status: 404 }
    );
  } else if (error instanceof ValidationError) {
    return NextResponse.json(
      { error: error.message || "Bad request" },
      { status: 400 }
    );
  } else if (error instanceof ForbiddenError) {
    return NextResponse.json(
      { error: error.message || "Forbidden" },
      { status: 403 }
    );
  }

  return NextResponse.json({ error: message }, { status: 500 });
}
export { ForbiddenError, NotFoundError, ValidationError };
