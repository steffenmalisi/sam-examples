import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

export class BackendStack extends cdk.Stack {
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

    new lambda.Function(this, "GetAllItems", {
      code: lambda.Code.fromAsset("src/handlers/get-all-items"),
      handler: "get-all-items.getAllItemsHandler",
      runtime: lambda.Runtime.NODEJS_14_X
    });

    new lambda.Function(this, "GetById", {
      code: lambda.Code.fromAsset("src/handlers"),
      handler: "get-by-id.getByIdHandler",
      runtime: lambda.Runtime.NODEJS_14_X,
      layers: [
        awsSdkLayer
      ]
    });

    new lambda.Function(this, "PutItem", {
      code: lambda.Code.fromAsset("src/handlers"),
      handler: "put-item.putItemHandler",
      runtime: lambda.Runtime.NODEJS_14_X,
      layers: [
        awsSdkLayer
      ]
    });
  }
}
