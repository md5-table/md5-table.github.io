import axios from './axios'

export default function loadPlugins ({app, router, Vue}) {
    console.log('Load plugins')
    axios({app, router, Vue})
}