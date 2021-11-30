import * as cdk from '@aws-cdk/core';
import { BackendStack } from '../lib/backend-stack';
import { BetterBackendStack } from '../lib/better-backend-stack';

const app = new cdk.App();
new BackendStack(app, 'BackendStack');
new BetterBackendStack(app, 'BetterBackendStack');
app.synth();