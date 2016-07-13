
-依赖jquery
-模仿bootstrap插件模式


#Usage
```
	$(selector).print(options);
```

#Options
```
{
		'speed' : 300,						//文字速度
		'startIndex' : 0,					//从第几个字符开始打印
		'endIndex' : 0,						//打印到第几个字符结束
		'hasCur' : true,					//是否显示光标
		'curId' : 'cur',					//光标的ID
		'curStr' : '|',						//光标字符
		'curClass' : 'cur',				//光标的样式类名
		'curSpeed' : 100,					//光标速度（ms）
		'str': '									//行首字符
		'delLength': 0						//删除字符长度
	};
```


