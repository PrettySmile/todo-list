import { ApiProperty } from "@nestjs/swagger";

export class UserCreateSwaggerDto {
  @ApiProperty({ description: "使用者名稱", example: "alice" })
  name!: string;

  @ApiProperty({
    description: "使用者密碼",
    example: "password123",
  })
  password!: string;
}

export class UserLoginSwaggerDto {
  @ApiProperty({ description: "使用者名稱", example: "alice" })
  name!: string;

  @ApiProperty({ description: "使用者密碼", example: "password123" })
  password!: string;
}
