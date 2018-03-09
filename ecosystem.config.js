module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
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

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : '192.168.10.11',
      ref  : 'origin/master',
      // repo : 'git@github.com:thinkmix/ka_ecs.git',
      repo : 'https://github.com/thinkmix/ka_ecs.git',
      path : '/root/nginx/html/ka_ecs',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production'
    },
  }
};
