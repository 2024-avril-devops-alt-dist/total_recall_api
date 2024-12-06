declare module "swagger-ui-react" {
  import type { FC } from "react";

  interface SwaggerUIProps {
    url?: string;
  }

  const SwaggerUI: FC<SwaggerUIProps>;
  export default SwaggerUI;
}
