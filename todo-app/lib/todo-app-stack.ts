import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as apiGateway from "@aws-cdk/aws-apigateway"
import * as s3 from "@aws-cdk/aws-s3"
import * as s3n from "@aws-cdk/aws-s3-notifications"
import * as s3d from "@aws-cdk/aws-s3-deployment"
import { TodoBackend } from './todo-backend';
export class TodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const todoBackend = new TodoBackend(this, "TodoBackend")

    new apiGateway.LambdaRestApi(this, 'Endpoint',{
      handler: todoBackend.handler
    })
    const logoBucket = new s3.Bucket(this, 'LogoBucket',{publicReadAccess : true})
    

  }
}
