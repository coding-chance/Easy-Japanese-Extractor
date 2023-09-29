# Easy Japanese Extractor
This is chrome extension that extracts words and phrases from a web page called [Easy Japanese lessons](https://www.nhk.or.jp/lesson/en/lessons) provided by NHK. After extracting words, this tool will automatically convert them to a specific format that can be imported to the application called [Quizlet](http://quizlet.com) so you can remember vocabulary efficiently.

![court-list-top](https://github.com/coding-chance/Easy-Japanese-Extractor/blob/master/images/dialogue_easy-japanese-extractor.gif?raw=true)

## Installation
1. Download the source code of this repository and unzip it on your computer
2. Open chrome browser and type `chrome://extensions` on url bar and press enter key
3. Enable developer mode by clicking on `Developer mode` (toggle button) displayed on top right
4. Click `Load Unpacked` on top left and choose the folder of the source code of this tool. Now the extension is installed.

> If you want to make the starting icon appear on top right, click on extension icon looking like a piece of puzzles on top right. If you find the name of the extension, click on a pin icon displayed on the left to it. That way, the icon of the extension will be permanently displayed on top right when you open chrome browser.


## Usage
All you have to do is to visit the [page of Japanese Conversation lessons](https://www.nhk.or.jp/lesson/en/lessons/01.html) and click on the icon displayed on top right. You can choose either `Dialogue` or `vocabulary`. Extracted words will be stored into both `Download` folder and clipboard. Under `Donwload` folder, you'll find csv file and txt file. You can import csv data into spreadsheet or excel sheet in a second.
<br>

> Since the data is copied to the clipboard, you can import vocabulary to Quizlet. After importing the vocabulary to Quizlet, you can review the words anytime, anywhere on your smartphone.


## for those who learn Japanese
I actually am a professional Japanese coach who helped hundreds of people who wanted to acquire Japanese as a second language. If you'd like to learn Japanse efficiently or master advanced Japanese as quickly as possible, feel free to contact me by sending DM to [ X Account ( used to be called 'twitter') ](https://twitter.com/Koki33621949) or [sending an email](koki.kusuhara.business@gmail.com). I look forward to sharing all the techniques and wonderful learning experience with you.


## Trouble Shooting
Sometimes, you might fail to copy extracted data to clipboard and see an error message like this below. 
<br>

`Failed to copy vocabulary to clipboard. Check console on your browser.`

<br>

When you see this error, the extracted data is not copied to the clipboard so you can't paste it immediately. Although you can pick up the extracted data from downloaded file in `Download` folder, but this is a bit inconvienient.

One of the users reported me that you can fix this problem by restarting chrome browser. Another user reported that when you click the page many times quickly right after pressing "OK" on the dialogue message, you are likely to succeed in having the data on the clipboard. If the problem persists, let me know details of the problem by [sending me an issue](https://github.com/coding-chance/Easy-Japanese-Extractor/issues) on github