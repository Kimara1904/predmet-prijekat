using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_2_Online_Shop.Migrations
{
    /// <inheritdoc />
    public partial class IsCancledMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsCanceled",
                table: "Orders",
                newName: "IsCancled");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEBCbGQEWR0dDGDTkMf0E2LLFEq8Z4o+BSjmCVsLkAWe5cF0TSngt+V3mmXDIf3aLLg==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsCancled",
                table: "Orders",
                newName: "IsCanceled");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEGj+alek1PWfaSrXA5/xot9w761qA967D3gmnsCufQJaFVPs6Ho5sFAWPv887fMLAQ==");
        }
    }
}
