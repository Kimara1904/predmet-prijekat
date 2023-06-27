using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_2_Online_Shop.Migrations
{
    /// <inheritdoc />
    public partial class ModifyVerifiedPropertyMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Verificated",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Verified",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "Verified" },
                values: new object[] { "AQAAAAEAACcQAAAAEDK0YiPowoXmgEWdErMXGwHs1wLGveDtl9gPlCXFKAjUkIs6xhPQY/C4TumnIy0QAQ==", "Accepted" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Verified",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "Verificated",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "Verificated" },
                values: new object[] { "AQAAAAEAACcQAAAAEOnYsVRdMCc8xiu+432E1XyGiJzdoQbwiaXQAzlO5nUirZxfVyoKmFWhUCeWTpbCxw==", 1 });
        }
    }
}
