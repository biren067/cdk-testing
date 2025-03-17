import * as cdk from 'aws-cdk-lib'
import { Construct } from "constructs";
import { CodePipeline,CodePipelineSource,ShellStep } from "aws-cdk-lib/pipelines";

export class CdkPipelineDemoStack extends cdk.Stack
{
    constructor(scope: Construct, id: string, props?: cdk.StackProps){
        super(scope,id,props)
    

    const githubToken = cdk.SecretValue.secretsManager('github-secret-token');

    new CodePipeline(this,'Pipeline',{
        pipelineName: 'TestPipeline',
        synth: new ShellStep('Synth',{
            input: CodePipelineSource.gitHub('biren067/cdk-testing','master',{authentication:githubToken}),
            commands:[
                'npm ci',
                'npm run build',
                'npm cdk synth'
            ]
        })
    })
}
}