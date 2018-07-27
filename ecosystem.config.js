module.exports = {
  apps : [

    // First application
    {
      name      : 'ka_ecs',
      script    : '',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],
  deploy : {
    test : {
      user : 'root',
      host : '192.168.10.110',
      ref  : 'origin/master',
      // repo : 'git@github.com:thinkmix/ka_ecs.git',
      repo : 'https://github.com/thinkmix/ka_ecs.git',
      path : '/home/nginx/html/ka_ecs',
      'post-deploy' : 'cnpm install && npm run build && pm2 reload ecosystem.config.js --env test'
    },
    onlineTest : {
      user : 'root',
      host : '47.98.43.180',
      ref  : 'origin/master',
      // repo : 'git@github.com:thinkmix/ka_ecs.git',
      repo : 'https://github.com/thinkmix/ka_ecs.git',
      path : '/usr/local/nginx/html/ka_ecs',
      'post-deploy' : 'cnpm install && npm run build && pm2 reload ecosystem.config.js --env production'
    },
    production : {
      user : 'root',
      host : '47.97.198.73',
      ref  : 'origin/master',
      // repo : 'git@github.com:thinkmix/ka_ecs.git',
      repo : 'https://github.com/thinkmix/ka_ecs.git',
      path : '/usr/local/nginx/html/ka_ecs',
      'post-deploy' : 'cnpm install && npm run build && pm2 reload ecosystem.config.js --env production'
    },
    yfdTest : {
        user : 'root',
        host : '192.168.10.103',
        ref  : 'origin/master',
        // repo : 'git@github.com:thinkmix/ka_ecs.git',
        repo : 'https://github.com/thinkmix/ka_ecs.git',
        path : '/home/nginx/html/ka_ecs',
        'post-deploy' : 'cnpm install && npm run build && pm2 reload ecosystem.config.js --env test'
    },
    yfdProduction : {
        user : 'root',
        host : '39.104.179.79',
        ref  : 'origin/master',
        // repo : 'git@github.com:thinkmix/ka_ecs.git',
        repo : 'https://github.com/thinkmix/ka_ecs.git',
        path : '/home/nginx/html/ka_ecs',
        'post-deploy' : 'cnpm install && npm run build && pm2 reload ecosystem.config.js --env production'
      },
  }
};

