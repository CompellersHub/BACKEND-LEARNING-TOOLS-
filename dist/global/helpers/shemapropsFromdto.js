"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaPropsFromDto = getSchemaPropsFromDto;
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
function getSchemaPropsFromDto(dto) {
    const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
        refPointerPrefix: "",
        classTransformerMetadataStorage: global
            .classTransformerMetadataStorage,
        additionalConverters: {},
    });
    return schemas[dto.name]?.properties ?? {};
}
//# sourceMappingURL=shemapropsFromdto.js.map