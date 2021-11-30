import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as lambda_node from "@aws-cdk/aws-lambda-nodejs";

export class BetterBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const awsSdkLayer = new lambda.LayerVersion(this, "AwsSdkLayer", {
      layerVersionName: `${this.stackName}-AwsSdk`,
      description: "AwsSdk",
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_14_X
      ],
      code: lambda.Code.fromAsset('src/layers/aws-sdk'),
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    new lambda_node.NodejsFunction(this, "GetAllItems", {
      entry: "src/handlers/get-all-items/get-all-items.ts",
      handler: "getAllItemsHandler",
      runtime: lambda.Runtime.NODEJS_14_X
    });

    new lambda_node.NodejsFunction(this, "GetById", {
      entry: "src/handlers/get-by-id.ts",
      handler: "getByIdHandler",
      runtime: lambda.Runtime.NODEJS_14_X,
      layers: [
        awsSdkLayer
      ]
    });

    new lambda_node.NodejsFunction(this, "PutItem", {
      entry: "src/handlers/put-item.ts",
      handler: "putItemHandler",
      runtime: lambda.Runtime.NODEJS_14_X,
      layers: [
        awsSdkLayer
      ]
    });
  }
}
