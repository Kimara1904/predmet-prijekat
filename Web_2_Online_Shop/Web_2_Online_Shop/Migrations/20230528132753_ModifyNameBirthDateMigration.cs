using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_2_Online_Shop.Migrations
{
    /// <inheritdoc />
    public partial class ModifyNameBirthDateMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Birth",
                table: "Users",
                newName: "BirthDate");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEK8ZEBjNLnxrITkTOnWRTP+DZiYPWv4Jz054G2WhrU8032wio9ByI/yrBXkY1KF+3A==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BirthDate",
                table: "Users",
                newName: "Birth");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEEaLoUTSuzF7wSrKa8vnhYizauNT5z/VzBSDHBr3sXhXF7XnypFy0mL6//v0vGWWBw==");
        }
    }
}
