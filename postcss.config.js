if(process.env.NODE_ENV === 'production') {
    module.exports = {
        plugins: [
            require('autoprefixer'),
            require('cssnano'),
        ]
    }
}

// plugins: {
//     'postcss-pseudoelements': {},
//     'postcss-cssnext': {
//         browsers: ['last 2 versions', 'ie > 10']
//     },
// },
