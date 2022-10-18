#!groovy
node {
    REFSPEC="+refs/pull/*:refs/remotes/origin/pr/*"
    stage("Checkout") {
        if (params != null && params.ghprbPullId == null) {
            echo 'Checking out from master'
            // master needs to be substituted with the release branch.
            REFSPEC="+refs/heads/master:refs/remotes/origin/master"
        }
        VARS = checkout(scm:[$class: 'GitSCM', branches: [[name: "${sha1}"]],
            doGenerateSubmoduleConfigurations: false,
            submoduleCfg: [],
            userRemoteConfigs: [
                [credentialsId: 'atyponci-ssh',
                name: 'origin',
                refspec: "${REFSPEC}",
                url: 'git@github.com:Atypon-OpenSource/manuscripts-style-guide.git']
            ]]
        )
    }
 
    stage("Build") {
        nodejs(nodeJSInstallationName: 'node_14_16') {
            sh (script: "yarn install --network-timeout 300000 --frozen-lockfile --non-interactive", returnStdout: true)
            sh (script: "yarn run typecheck", returnStdout: true)
            sh (script: "yarn run lint", returnStdout: true)
            sh (script: "yarn run test", returnStdout: true)
            sh (script: "yarn run build", returnStdout: true)
        }
    }

//    if (VARS.GIT_BRANCH == "origin/master") {
    stage("Publish") {
        withCredentials([string(credentialsId: 'NPM_TOKEN_MANUSCRIPTS_OSS', variable: 'NPM_TOKEN')]) {
            sh ("npx @manuscripts/publish")
        }
    }
//    }
}
