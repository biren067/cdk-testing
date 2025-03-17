import * as cdk from 'aws-cdk-lib'
import { Construct } from "constructs";
import { CodePipeline,CodePipelineSource,ShellStep } from "aws-cdk-lib/pipelines";

export class CdkPipelineDemoStack extends cdk.Stack
{
    constructor(scope: Construct, id: string, props?: cdk.StackProps){
        super(scope,id,props)
    
    new CodePipeline(this,'Pipeline',{
        pipelineName: 'TestPipeline',
        synth: new ShellStep('Synth',{
            input: CodePipelineSource.gitHub('biren067/cdk-testing','main'),
            commands:[
                'npm ci',
                'npm run build',
                'npm cdk synth'
            ]
        })
    })
}
}