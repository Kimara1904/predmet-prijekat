using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_2_Online_Shop.Migrations
{
    /// <inheritdoc />
    public partial class ModifyArticleMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Articles_ArticleId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_ArticleId",
                table: "OrderItems");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEOetzZYYkYdnsMF7nmhhPWTOBN/J494bh/jki/do5aigOWvex1kjAj6CY0/WbUhFrA==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEBCdUk7xqdv1kB/A2rRjIDFusxxOf4sjy9G+czmR8awqaeM4DorAXAzPC4A5MwOeXw==");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ArticleId",
                table: "OrderItems",
                column: "ArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Articles_ArticleId",
                table: "OrderItems",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
