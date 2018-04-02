import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        name: 'library',
        format: 'umd'
    },
    plugins: [
        resolve(),
        (process.env.NODE_ENV === 'production' && uglify()),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        })
    ]
}