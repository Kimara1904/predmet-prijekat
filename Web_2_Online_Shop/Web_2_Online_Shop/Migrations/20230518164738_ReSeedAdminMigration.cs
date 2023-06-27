using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_2_Online_Shop.Migrations
{
    /// <inheritdoc />
    public partial class ReSeedAdminMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "Verificated" },
                values: new object[] { "AQAAAAEAACcQAAAAEOnYsVRdMCc8xiu+432E1XyGiJzdoQbwiaXQAzlO5nUirZxfVyoKmFWhUCeWTpbCxw==", 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Password", "Verificated" },
                values: new object[] { "AQAAAAEAACcQAAAAEFw9KdY9h/vg/k6oKBSGZed/iqvqI2DlNkGuHvZVVjZYLHIz+5gHV2s88DZ5OB59jg==", 0 });
        }
    }
}
