using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_2_Online_Shop.Migrations
{
    /// <inheritdoc />
    public partial class ModifyItemAndOrderMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Articles_ArticleId",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "IsCancled",
                table: "Orders",
                newName: "IsCanceled");

            migrationBuilder.AddColumn<double>(
                name: "DeliveryPrice",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ArticleName",
                table: "OrderItems",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "ArticlePrice",
                table: "OrderItems",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEBCdUk7xqdv1kB/A2rRjIDFusxxOf4sjy9G+czmR8awqaeM4DorAXAzPC4A5MwOeXw==");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Articles_ArticleId",
                table: "OrderItems",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Articles_ArticleId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "DeliveryPrice",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ArticleName",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "ArticlePrice",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "IsCanceled",
                table: "Orders",
                newName: "IsCancled");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEK8ZEBjNLnxrITkTOnWRTP+DZiYPWv4Jz054G2WhrU8032wio9ByI/yrBXkY1KF+3A==");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Articles_ArticleId",
                table: "OrderItems",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
