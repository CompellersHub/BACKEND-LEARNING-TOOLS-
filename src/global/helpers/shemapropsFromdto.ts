import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { getFromContainer, MetadataStorage } from "class-validator";

export function getSchemaPropsFromDto(dto: Function) {
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: "",
    classTransformerMetadataStorage: (global as any)
      .classTransformerMetadataStorage,
    additionalConverters: {},
  });

  return schemas[dto.name]?.properties ?? {};
}
