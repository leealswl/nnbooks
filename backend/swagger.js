import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "📚 누나네 책방 API",
      version: "1.0.0",
      description: "✨ 프론트/백엔드 협업을 위한 API 문서입니다.",
    },
    servers: [
      {
        url: "https://nnbook-production.up.railway.app:8080",
        description: "배포 서버",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);

export { specs, swaggerUi };
