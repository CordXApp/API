import boom from "boom";
import github from '../../../middleware/github/index';

export const fetchProjectVersions = async (): Promise<any> => {
    try {

        return {
            current: {
                api: `v${await github.getProjectVersion({ repo: 'CordXApp/API', branch: 'prod' })}`,
                client: `v${await github.getProjectVersion({ repo: 'CordXApp/Client', branch: 'master' })}`,
                website: `v${await github.getProjectVersion({ repo: 'CordXApp/Website', branch: 'master' })}`,
                documentation: `v${await github.getProjectVersion({ repo: 'CordXApp/Documentation', branch: 'master' })}`
            },
            newest: {
                api: `v${await github.getProjectVersion({ repo: 'CordXApp/API', branch: 'beta' })}`,
                client: `v${await github.getProjectVersion({ repo: 'CordXApp/Client', branch: 'development' })}`,
                website: `v${await github.getProjectVersion({ repo: 'CordXApp/Website', branch: 'master' })}`,
                documentation: `v${await github.getProjectVersion({ repo: 'CordXApp/Documentation', branch: 'master' })}`
            },
            stable: {
                api: `v${await github.getProjectVersion({ repo: 'CordXApp/API', branch: 'prod' })}`,
                client: `v${await github.getProjectVersion({ repo: 'CordXApp/Client', branch: 'master' })}`,
                website: `v${await github.getProjectVersion({ repo: 'CordXApp/Website', branch: 'master' })}`,
                documentation: `v${await github.getProjectVersion({ repo: 'CordXApp/Documentation', branch: 'master' })}`
            }
        }

    } catch (e: any) {

        throw new Error(e);
    }
}