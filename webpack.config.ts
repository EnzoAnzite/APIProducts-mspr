import * as webpack from 'webpack';
// @ts-ignore
import dotenv from 'dotenv-webpack';
// @ts-ignore
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpackShellPlugin from 'webpack-shell-plugin-next';
// @ts-ignore
import nodeExternals from 'webpack-node-externals';
// @ts-ignore
import eslintwebpackplugin from 'eslint-webpack-plugin';
import * as path from 'path';

const output = {
    path: path.resolve(__dirname, 'dist'),
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