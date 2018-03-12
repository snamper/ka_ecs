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
    production : {
      user : 'root',
      host : '192.168.10.11',
      ref  : 'origin/master',
      // repo : 'git@github.com:thinkmix/ka_ecs.git',
      repo : 'https://github.com/thinkmix/ka_ecs.git',
      path : '/root/nginx/html/ka_ecs',
      'post-deploy' : 'npm run build && pm2 reload ecosystem.config.js --env production'
    },
  }
};
