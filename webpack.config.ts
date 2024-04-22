import * as webpack from 'webpack';
import dotenv from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpackShellPlugin from 'webpack-shell-plugin-next';
import nodeExternals from 'webpack-node-externals';
import eslintwebpackplugin from 'eslint-webpack-plugin';

const output = {
    path: 'dist',
    filename: 'bundle.js'
}

export default (
    env: { [key: string]: string | undefined},
    argv: { [key: string]: string | undefined}
): webpack.Configuration =>{

    const isProduction = argv.mode === 'production';
   return {
       mode : isProduction ? 'production' : 'development',
       externals: [nodeExternals()],
       entry: './src/main.ts',
       output: {
           filename: output.filename,
           path: output.path
       },
       module: {
           rules: [
               {
                   test: /\.ts$/,
                   use: [
                          {
                            loader: 'ts-loader',
                            options: {
                                 transpileOnly: true,
                                configFile: 'tsconfig.json'
                            }
                          }
                   ]
               }
           ]
       },
       plugins : [
           new dotenv(),
           new ForkTsCheckerWebpackPlugin(),
           new webpackShellPlugin({
               onBuildStart : {
                   scripts: [
                       isProduction ? "echo 'Production Build'" : "echo 'Development Build'",
                       "echo 'Starting build process'",
                       'rimraf dist',
                       'rimraf build',
                   ],
                   blocking: true,
                   parallel: false
               },
               onBuildEnd: {
                   scripts: [
                       `echo 'Build process complete, ${isProduction ? 'you can make yarn monit for monitor' : "[CTRL+C to close]"} '`,
                       `nodemon ${output.path}/${output.filename}`,

                   ],
                   blocking: false,
                   parallel: true
               }

           }),
           new eslintwebpackplugin({
               extensions: ['ts'],
               exclude: ['node_modules', 'dist', 'build']
           }),

       ],
   }
};