/**
 * Config source: https://git.io/JBt3o
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import env from '#start/env'
import { DriveConfig } from '@ioc:Adonis/Core/Drive'
import app from '@adonisjs/core/services/app'

/*
|--------------------------------------------------------------------------
| Drive Config
|--------------------------------------------------------------------------
|
| The `DriveConfig` relies on the `DisksList` interface which is
| defined inside the `contracts` directory.
|
*/
const driveConfig: DriveConfig = {
  /*
  |--------------------------------------------------------------------------
  | Default disk
  |--------------------------------------------------------------------------
  |
  | The default disk to use for managing file uploads. The value is driven by
  | the `DRIVE_DISK` environment variable.
  |
  */
  disk: env.get('DRIVE_DISK'),

  disks: {
    /*
    |--------------------------------------------------------------------------
    | Local
    |--------------------------------------------------------------------------
    |
    | Uses the local file system to manage files. Make sure to turn off serving
    | assets when not using this disk.
    |
    */
    local: {
      driver: 'local',

      /*
      |--------------------------------------------------------------------------
      | Storage root
      |--------------------------------------------------------------------------
      |
      | Define an absolute path to the storage directory from where to read the
      | files.
      |
      */
      root: app.tmpPath('uploads'),

      /*
      |--------------------------------------------------------------------------
      | Visibility
      |--------------------------------------------------------------------------
      |
      | Visibility decides if the files from this disk are publicly accessible
      | or not. When set to "private" the files will be accessible only using
      | a signed URL
      |
      */
      visibility: 'public',

      /*
      |--------------------------------------------------------------------------
      | Serve assets
      |--------------------------------------------------------------------------
      |
      | When this is set to true, AdonisJS will configure an assets server to serve
      | files from the disk root. This is done to mimic the behavior of cloud
      | storage services that has inbuilt capabilities to serve files.
      |
      */
      serveFiles: true,

      /*
      |--------------------------------------------------------------------------
      | Base path
      |--------------------------------------------------------------------------
      |
      | Base path is always required when "serveAssets = true". Also make sure
      | the `basePath` is unique across all the disks using "local" driver and
      | you are not registering routes with this prefix.
      |
      */
      basePath: '/uploads',
    },

    s3: {
      driver: 's3',
      visibility: 'public',
      cdnUrl: env.get('S3_CDN_URL'),
      key: env.get('S3_KEY'),
      secret: env.get('S3_SECRET'),
      region: env.get('S3_REGION'),
      bucket: env.get('S3_BUCKET'),
      endpoint: env.get('S3_ENDPOINT'),
    },
  },
}

export default driveConfig
