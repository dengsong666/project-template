import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { BaseRes, PageRes } from "../model";

export const ApiResult = <TModel extends Type>(
  model: TModel,
  isPage = false,
) => {
  return applyDecorators(
    ApiExtraModels(BaseRes, model),
    ApiExtraModels(PageRes, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseRes) },
          {
            properties: {
              data: isPage
                ? {
                    $ref: getSchemaPath(PageRes),
                    properties: {
                      list: {
                        type: "array",
                        items: { $ref: getSchemaPath(model) },
                      },
                    },
                  }
                : { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
