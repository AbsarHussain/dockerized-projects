module.exports = {
  apps : [{
    
    script: 'src/app.js',
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    autorestart: true,
    max_memory_restart: '1024M',

    },
],

};
