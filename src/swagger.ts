import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { Application, Request, Response } from "express";
import path from "path";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";
import { riskLevel } from "./app/kyc-training-portal/interface";

export function swaggerDocs(app: Application, port: number | string) {
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: "#/components/schemas/",
  });

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(
    storage,
    {
      controllers: [path.join(__dirname, "app/**/*controller.{ts,js}")],
    },
    {
      components: {
        schemas: {
          ...schemas,
          CreateKYC: {
            type: "object",
            properties: {
              accountNumber: { $ref: "#/components/schemas/FieldTypeString" },
              entityName: { $ref: "#/components/schemas/FieldTypeString" },
              entityType: { $ref: "#/components/schemas/FieldTypeString" },
              productType: { $ref: "#/components/schemas/FieldTypeArray" },
              companyNumber: { $ref: "#/components/schemas/FieldTypeString" },
              incorporationDate: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              registeredOfficeAddress: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              natureOfBusiness: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              industry: { $ref: "#/components/schemas/FieldTypeString" },
              countryOfOrigin: { $ref: "#/components/schemas/FieldTypeString" },
              expectedTransactionVolume: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              sourceOfWealth: { $ref: "#/components/schemas/FieldTypeArray" },
              expectedTransactionFrequency: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              entityDescription: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              sourcesOfWealth: { $ref: "#/components/schemas/FieldTypeArray" },
              sourcesOfWealthExplanation: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              sourceOfFunds: { $ref: "#/components/schemas/FieldTypeArray" },
              sourcesOfFundsExplanation: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              sourcesOfWealthEvidenceDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              sourceOfFundsVerificationDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              enhancedBeneficialOwnershipDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              financialStatementsDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              taxReturnsOrCertificatesDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              professionalReferencesDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              assetValuationReportsDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              transactionHistoryDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              riskMitigationFactors: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              ongoingMonitoringRequirements: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              seniorManagementJustification: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              shareholders: {
                type: "array",
                items: { $ref: "#/components/schemas/OwnershipType" },
              },
              directors: {
                type: "array",
                items: { $ref: "#/components/schemas/Directors" },
              },
              subShareholder: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    parentIdentifier: { type: "string" },
                    detailed: {
                      items: {
                        type: "array",
                        $ref: "#/components/schemas/SubShareholderDetails",
                      },
                    },
                  },
                },
              },
              riskLevel: { type: "string", enum: Object.values(riskLevel) },
              annualReportLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              incorporationCertificateLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              listOfDirectorsLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              shareholdersLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              memorandumLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              natureOfBusinessLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              proofOfIdLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              proofOfIdUboLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              proofOfListingLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              proofOfRegulationLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              sanctionScreeningLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              sanctionScreeningUboLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },

              annualReportDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              incorporationCertificateDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              listOfDirectorsDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              shareholdersDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              memorandumDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              natureOfBusinessDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              proofOfIdDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              proofOfIdUboDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              proofOfListingDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              proofOfRegulationDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              sanctionScreeningDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              sanctionScreeningUboDocument: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Array of files to upload",
              },
              decision: {
                type: "string",
                enum: ["Decline", "Request Info", "Approve"],
              },
              detailedAnalysisAndFinding: { type: "string" },
              internalComments: { type: "string" },
            },
          },

          UpdateKYC: {
            type: "object",
            properties: {
              accountNumber: { $ref: "#/components/schemas/FieldTypeString" },
              entityName: { $ref: "#/components/schemas/FieldTypeString" },
              entityType: { $ref: "#/components/schemas/FieldTypeArray" },
              productType: { $ref: "#/components/schemas/FieldTypeArray" },
              companyNumber: { $ref: "#/components/schemas/FieldTypeString" },
              incorporationDate: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              registeredOfficeAddress: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              natureOfBusiness: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              industry: { $ref: "#/components/schemas/FieldTypeArray" },
              countryOfOrigin: { $ref: "#/components/schemas/FieldTypeString" },
              expectedTransactionVolume: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              sourceOfWealth: { $ref: "#/components/schemas/FieldTypeArray" },
              expectedTransactionFrequency: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              entityDescription: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              sourcesOfWealth: { $ref: "#/components/schemas/FieldTypeArray" },
              sourcesOfWealthExplanation: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              sourceOfFunds: { $ref: "#/components/schemas/FieldTypeArray" },
              sourcesOfFundsExplanation: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              sourcesOfWealthEvidence: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              sourceOfFundsVerification: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              enhancedBeneficialOwnership: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              financialStatements: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              taxReturnsOrCertificates: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              professionalReferences: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              assetValuationReports: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              transactionHistory: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              riskMitigationFactors: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              ongoingMonitoringRequirements: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              seniorManagementJustification: {
                $ref: "#/components/schemas/FieldTypeString",
              },
              shareholders: {
                type: "array",
                items: { $ref: "#/components/schemas/OwnershipType" },
              },
              directors: {
                type: "array",
                items: { $ref: "#/components/schemas/Directors" },
              },
              subShareholder: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    parentIdentifier: { type: "string" },
                    detailed: {
                      items: {
                        type: "array",
                        $ref: "#/components/schemas/SubShareholderDetails",
                      },
                    },
                  },
                },
              },
              annualReportLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              incorporationCertificateLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              listOfDirectorsLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              shareholdersLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              memorandumLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              natureOfBusinessLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              proofOfIdLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              proofOfIdUboLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              proofOfListingLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              proofOfRegulationLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              sanctionScreeningLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              sanctionScreeningUboLinks: {
                type: "array",
                items: { $ref: "#/components/schemas/KYCLink" },
              },
              annualReportDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              incorporationCertificateDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              listOfDirectorsDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              shareholdersDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              memorandumDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              natureOfBusinessDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              proofOfIdDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              proofOfIdUboDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              proofOfListingDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              proofOfRegulationDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              sanctionScreeningDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              sanctionScreeningUboDocument: {
                type: "array",
                items: { $ref: "#/components/schemas/KycDocument" },
              },
              score: { type: "number" },
              comment: { type: "string" },
              detailedAnalysisAndFinding: { type: "string" },
              internalComments: { type: "string" },
            },
          },
        },
      },
      info: {
        title: "Titan Learning Platform API",
        description: "API documentation for the Titan Learning Platform",
        version: "1.0.0",
        contact: {
          name: "Olaniyan Mutiu Abiodun",
          email: "olaniyanmutiu96@gmail.com",
          url: "https://github.com/ennyolar96",
        },
      },
      servers: [
        {
          url: "http://localhost:4040/api",
          description: "Local server",
        },
        {
          url: "https://titan-learn.onrender.com/api",
          description: "Development server",
        },
        {
          url: "https://api.server-hosting.com/api",
          description: "Production server",
        },
      ],
    }
  );

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

  app.get("/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.json(spec);
  });

  console.log("documentation", `http://localhost:${port}/api-docs`);
}
