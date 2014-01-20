beez-tab
===============

tab view for beez

#About
Beez専用、タブプラグインです

#Requirements
- beez
- beez-touch

#Features
タブ機能を提供します

#Use

```
    // View
    var TabView = index.View.extend(
        'beez.tab.view',
        {
            render: function () {
                $('#w').append(this.$el);
            }
        }
    );
    // create collection
    var tabCollection = mm.createCollection('/@', index.Collection, [
        {text: 'tab1'},
        {text: 'tab2'},
        {text: 'tab3'}
    ]);
    // create View
    var tab = beez.manager.v.create('/@', TabView, {
        model: tabCollection
    });

    // show view
    tab.async().show().end();
```

#View
タブViewクラス

## Override

### onChange(model)
タブ選択時の処理を設定したい場合はオーバーライドしてください

## Options

### prefix
`vidx`,`className`のprefix

# build

```
$ npm install -g grunt-cli
$ npm install .
$ grunt # releaseフォルダにリリースファイルが作成されます
```

# Sample/Test

サンプルテストページが用意されています

> beez-foundation がインストールされている必要があります

```
$ npm install -g grunt-cli
$ npm install .

$ grunt foundation
```

**ブラウザで開く** : [http://0.0.0.0:1109/m/beez-tab/spec/all.html](http://0.0.0.0:1109/m/beez-tab/spec/all.html)

# Contributing

- Kei FUNAGAYAMA - [github](https://github.com/fkei) : [twitter](https://twitter.com/fkei)
- HIRAKI Satoru - [github](https://github.com/Layzie)
- Masaki Sueda - [github](https://github.com/maaaaaaa7)

# LICENSE
CyberAgent, Inc. All rights reserved.

@see : [LICENSE](https://github.com/shibucafe/beez-tab/blob/master/LICENSE)

```
The MIT License (MIT)

Copyright (c) 2013- CyberAgent, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

