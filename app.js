
/* =================================================================
   1) DỮ LIỆU TỪ VỰNG
   -----------------------------------------------------------------
   • Mỗi từ là 1 object theo schema trong yêu cầu.
   • Đây là 50 từ mẫu thuộc Level 1. Để nạp đủ 3000 từ, chỉ cần
     thêm tiếp các object vào MẢNG NÀY (theo lô 100–200 từ/lần).
     App tự động đọc động số lượng từ trong mảng, không cần sửa
     code ở chỗ khác.
   ================================================================= */
const WORDS = [
  {id:1, word:"time", ipa:"/taɪm/", pos:"noun", level:1, vi:"thời gian — khoảng thời gian trôi qua, đo bằng giờ/phút/giây", examples:[{en:"What time is it now?", vi:"Bây giờ là mấy giờ?"},{en:"I don't have time today.", vi:"Hôm nay tôi không có thời gian."}]},
  {id:2, word:"people", ipa:"/ˈpiːpl/", pos:"noun", level:1, vi:"con người, mọi người (số nhiều của \"person\")", examples:[{en:"A lot of people came to the party.", vi:"Rất nhiều người đến bữa tiệc."},{en:"People love good food.", vi:"Mọi người đều thích đồ ăn ngon."}]},
  {id:3, word:"year", ipa:"/jɪr/", pos:"noun", level:1, vi:"năm — khoảng thời gian 12 tháng", examples:[{en:"I am twenty years old.", vi:"Tôi hai mươi tuổi."},{en:"We meet every year.", vi:"Chúng tôi gặp nhau mỗi năm."}]},
  {id:4, word:"way", ipa:"/weɪ/", pos:"noun", level:1, vi:"cách, đường đi — phương pháp làm việc gì hoặc lối đi", examples:[{en:"This is the best way to learn.", vi:"Đây là cách học tốt nhất."},{en:"Can you show me the way?", vi:"Bạn chỉ đường cho tôi được không?"}]},
  {id:5, word:"day", ipa:"/deɪ/", pos:"noun", level:1, vi:"ngày — khoảng thời gian 24 giờ", examples:[{en:"Have a nice day!", vi:"Chúc một ngày tốt lành!"},{en:"I work eight hours a day.", vi:"Tôi làm việc tám tiếng mỗi ngày."}]},
  {id:6, word:"man", ipa:"/mæn/", pos:"noun", level:1, vi:"đàn ông — người nam trưởng thành", examples:[{en:"That man is my father.", vi:"Người đàn ông đó là bố tôi."},{en:"He is a kind man.", vi:"Anh ấy là một người đàn ông tốt bụng."}]},
  {id:7, word:"thing", ipa:"/θɪŋ/", pos:"noun", level:1, vi:"thứ, vật, điều — dùng cho đồ vật hoặc sự việc nói chung", examples:[{en:"What is that thing?", vi:"Cái thứ đó là gì vậy?"},{en:"I have many things to do.", vi:"Tôi có nhiều việc phải làm."}]},
  {id:8, word:"woman", ipa:"/ˈwʊmən/", pos:"noun", level:1, vi:"phụ nữ — người nữ trưởng thành", examples:[{en:"She is a strong woman.", vi:"Cô ấy là một người phụ nữ mạnh mẽ."},{en:"The woman is reading a book.", vi:"Người phụ nữ đang đọc sách."}]},
  {id:9, word:"life", ipa:"/laɪf/", pos:"noun", level:1, vi:"cuộc sống, cuộc đời, sự sống", examples:[{en:"Life is beautiful.", vi:"Cuộc sống thật đẹp."},{en:"She has a happy life.", vi:"Cô ấy có một cuộc sống hạnh phúc."}]},
  {id:10, word:"child", ipa:"/tʃaɪld/", pos:"noun", level:1, vi:"đứa trẻ, con (số nhiều là \"children\")", examples:[{en:"The child is playing outside.", vi:"Đứa trẻ đang chơi bên ngoài."},{en:"Every child needs love.", vi:"Mỗi đứa trẻ đều cần tình yêu thương."}]},
  {id:11, word:"world", ipa:"/wɜːrld/", pos:"noun", level:1, vi:"thế giới — toàn bộ trái đất và mọi người", examples:[{en:"I want to travel the world.", vi:"Tôi muốn đi vòng quanh thế giới."},{en:"Music brings the world together.", vi:"Âm nhạc gắn kết cả thế giới."}]},
  {id:12, word:"work", ipa:"/wɜːrk/", pos:"verb / noun", level:1, vi:"làm việc; công việc", examples:[{en:"I work in an office.", vi:"Tôi làm việc ở văn phòng."},{en:"She has a lot of work today.", vi:"Hôm nay cô ấy có nhiều việc."}]},
  {id:13, word:"go", ipa:"/ɡoʊ/", pos:"verb", level:1, vi:"đi — di chuyển từ nơi này đến nơi khác", examples:[{en:"I go to school by bus.", vi:"Tôi đi học bằng xe buýt."},{en:"Let's go home.", vi:"Mình về nhà thôi."}]},
  {id:14, word:"make", ipa:"/meɪk/", pos:"verb", level:1, vi:"làm, tạo ra, chế tạo", examples:[{en:"She makes coffee every morning.", vi:"Cô ấy pha cà phê mỗi sáng."},{en:"Let's make a plan.", vi:"Hãy lập một kế hoạch."}]},
  {id:15, word:"know", ipa:"/noʊ/", pos:"verb", level:1, vi:"biết, hiểu, quen biết", examples:[{en:"I know the answer.", vi:"Tôi biết câu trả lời."},{en:"Do you know her?", vi:"Bạn có quen cô ấy không?"}]},
  {id:16, word:"take", ipa:"/teɪk/", pos:"verb", level:1, vi:"lấy, cầm, mang theo; tốn (thời gian)", examples:[{en:"Please take this book.", vi:"Làm ơn cầm lấy cuốn sách này."},{en:"It takes ten minutes.", vi:"Việc đó mất mười phút."}]},
  {id:17, word:"see", ipa:"/siː/", pos:"verb", level:1, vi:"nhìn, thấy, gặp", examples:[{en:"I can see the mountain.", vi:"Tôi có thể thấy ngọn núi."},{en:"See you tomorrow!", vi:"Hẹn gặp lại ngày mai!"}]},
  {id:18, word:"come", ipa:"/kʌm/", pos:"verb", level:1, vi:"đến, tới", examples:[{en:"Come here, please.", vi:"Lại đây nào."},{en:"She comes from Vietnam.", vi:"Cô ấy đến từ Việt Nam."}]},
  {id:19, word:"think", ipa:"/θɪŋk/", pos:"verb", level:1, vi:"nghĩ, suy nghĩ, cho rằng", examples:[{en:"I think you are right.", vi:"Tôi nghĩ bạn đúng."},{en:"Let me think about it.", vi:"Để tôi suy nghĩ đã."}]},
  {id:20, word:"look", ipa:"/lʊk/", pos:"verb", level:1, vi:"nhìn; trông có vẻ", examples:[{en:"Look at the sky!", vi:"Nhìn bầu trời kìa!"},{en:"You look tired.", vi:"Trông bạn có vẻ mệt."}]},
  {id:21, word:"want", ipa:"/wɑːnt/", pos:"verb", level:1, vi:"muốn", examples:[{en:"I want a cup of tea.", vi:"Tôi muốn một tách trà."},{en:"What do you want?", vi:"Bạn muốn gì?"}]},
  {id:22, word:"give", ipa:"/ɡɪv/", pos:"verb", level:1, vi:"cho, đưa, tặng", examples:[{en:"Give me your hand.", vi:"Đưa tay cho tôi."},{en:"She gave me a gift.", vi:"Cô ấy tặng tôi một món quà."}]},
  {id:23, word:"use", ipa:"/juːz/", pos:"verb", level:1, vi:"dùng, sử dụng", examples:[{en:"Can I use your phone?", vi:"Tôi dùng điện thoại của bạn được không?"},{en:"We use water every day.", vi:"Chúng ta dùng nước mỗi ngày."}]},
  {id:24, word:"find", ipa:"/faɪnd/", pos:"verb", level:1, vi:"tìm thấy, tìm ra", examples:[{en:"I can't find my keys.", vi:"Tôi không tìm thấy chìa khóa."},{en:"Did you find the answer?", vi:"Bạn đã tìm ra câu trả lời chưa?"}]},
  {id:25, word:"tell", ipa:"/tel/", pos:"verb", level:1, vi:"kể, nói cho ai biết", examples:[{en:"Tell me the truth.", vi:"Hãy nói thật cho tôi biết."},{en:"She told me a story.", vi:"Cô ấy kể cho tôi một câu chuyện."}]},
  {id:26, word:"ask", ipa:"/æsk/", pos:"verb", level:1, vi:"hỏi, yêu cầu, nhờ", examples:[{en:"Can I ask you something?", vi:"Tôi hỏi bạn một chút được không?"},{en:"He asked for help.", vi:"Anh ấy nhờ giúp đỡ."}]},
  {id:27, word:"eat", ipa:"/iːt/", pos:"verb", level:1, vi:"ăn", examples:[{en:"I eat breakfast at seven.", vi:"Tôi ăn sáng lúc bảy giờ."},{en:"Let's eat together.", vi:"Mình ăn cùng nhau nhé."}]},
  {id:28, word:"good", ipa:"/ɡʊd/", pos:"adjective", level:1, vi:"tốt, hay, giỏi", examples:[{en:"This is a good idea.", vi:"Đây là một ý tưởng hay."},{en:"She is good at math.", vi:"Cô ấy giỏi toán."}]},
  {id:29, word:"new", ipa:"/njuː/", pos:"adjective", level:1, vi:"mới", examples:[{en:"I have a new phone.", vi:"Tôi có một chiếc điện thoại mới."},{en:"She is the new teacher.", vi:"Cô ấy là giáo viên mới."}]},
  {id:30, word:"first", ipa:"/fɜːrst/", pos:"adjective / adverb", level:1, vi:"đầu tiên, thứ nhất; trước hết", examples:[{en:"This is my first time here.", vi:"Đây là lần đầu tiên tôi đến đây."},{en:"Finish your work first.", vi:"Làm xong việc trước đã."}]},
  {id:31, word:"big", ipa:"/bɪɡ/", pos:"adjective", level:1, vi:"to, lớn", examples:[{en:"They live in a big house.", vi:"Họ sống trong một ngôi nhà lớn."},{en:"I have a big family.", vi:"Tôi có một gia đình đông người."}]},
  {id:32, word:"small", ipa:"/smɔːl/", pos:"adjective", level:1, vi:"nhỏ, bé", examples:[{en:"This shirt is too small.", vi:"Cái áo này nhỏ quá."},{en:"We have a small garden.", vi:"Chúng tôi có một khu vườn nhỏ."}]},
  {id:33, word:"happy", ipa:"/ˈhæpi/", pos:"adjective", level:1, vi:"vui, hạnh phúc", examples:[{en:"I am happy to see you.", vi:"Tôi vui khi gặp bạn."},{en:"They look very happy.", vi:"Trông họ rất hạnh phúc."}]},
  {id:34, word:"house", ipa:"/haʊs/", pos:"noun", level:1, vi:"ngôi nhà", examples:[{en:"Their house is very big.", vi:"Nhà của họ rất to."},{en:"Come to my house tonight.", vi:"Tối nay đến nhà tôi nhé."}]},
  {id:35, word:"water", ipa:"/ˈwɔːtər/", pos:"noun", level:1, vi:"nước", examples:[{en:"Can I have some water?", vi:"Cho tôi xin chút nước được không?"},{en:"Fish live in water.", vi:"Cá sống dưới nước."}]},
  {id:36, word:"food", ipa:"/fuːd/", pos:"noun", level:1, vi:"thức ăn, đồ ăn", examples:[{en:"The food here is delicious.", vi:"Đồ ăn ở đây rất ngon."},{en:"We need to buy food.", vi:"Chúng ta cần mua thức ăn."}]},
  {id:37, word:"friend", ipa:"/frend/", pos:"noun", level:1, vi:"bạn, bạn bè", examples:[{en:"He is my best friend.", vi:"Anh ấy là bạn thân nhất của tôi."},{en:"I have many friends.", vi:"Tôi có nhiều bạn."}]},
  {id:38, word:"family", ipa:"/ˈfæməli/", pos:"noun", level:1, vi:"gia đình", examples:[{en:"I love my family.", vi:"Tôi yêu gia đình của mình."},{en:"We are a small family.", vi:"Chúng tôi là một gia đình nhỏ."}]},
  {id:39, word:"school", ipa:"/skuːl/", pos:"noun", level:1, vi:"trường học", examples:[{en:"The children go to school.", vi:"Bọn trẻ đến trường."},{en:"My school is near here.", vi:"Trường tôi ở gần đây."}]},
  {id:40, word:"money", ipa:"/ˈmʌni/", pos:"noun", level:1, vi:"tiền", examples:[{en:"I don't have much money.", vi:"Tôi không có nhiều tiền."},{en:"Time is money.", vi:"Thời gian là tiền bạc."}]},
  {id:41, word:"book", ipa:"/bʊk/", pos:"noun", level:1, vi:"quyển sách", examples:[{en:"I am reading a good book.", vi:"Tôi đang đọc một quyển sách hay."},{en:"She bought three books.", vi:"Cô ấy mua ba quyển sách."}]},
  {id:42, word:"love", ipa:"/lʌv/", pos:"verb / noun", level:1, vi:"yêu; tình yêu", examples:[{en:"I love my mother.", vi:"Tôi yêu mẹ của mình."},{en:"Love is important.", vi:"Tình yêu rất quan trọng."}]},
  {id:43, word:"help", ipa:"/help/", pos:"verb / noun", level:1, vi:"giúp đỡ; sự giúp đỡ", examples:[{en:"Can you help me?", vi:"Bạn giúp tôi được không?"},{en:"Thank you for your help.", vi:"Cảm ơn vì đã giúp đỡ."}]},
  {id:44, word:"play", ipa:"/pleɪ/", pos:"verb", level:1, vi:"chơi; chơi (nhạc cụ, thể thao)", examples:[{en:"The kids play in the park.", vi:"Bọn trẻ chơi trong công viên."},{en:"I play the guitar.", vi:"Tôi chơi đàn ghi-ta."}]},
  {id:45, word:"learn", ipa:"/lɜːrn/", pos:"verb", level:1, vi:"học, học hỏi", examples:[{en:"I want to learn English.", vi:"Tôi muốn học tiếng Anh."},{en:"We learn from our mistakes.", vi:"Chúng ta học từ những sai lầm."}]},
  {id:46, word:"read", ipa:"/riːd/", pos:"verb", level:1, vi:"đọc", examples:[{en:"I read the news every morning.", vi:"Tôi đọc tin tức mỗi sáng."},{en:"She likes to read books.", vi:"Cô ấy thích đọc sách."}]},
  {id:47, word:"write", ipa:"/raɪt/", pos:"verb", level:1, vi:"viết", examples:[{en:"Please write your name here.", vi:"Vui lòng viết tên bạn vào đây."},{en:"He writes a letter to his friend.", vi:"Anh ấy viết thư cho bạn."}]},
  {id:48, word:"speak", ipa:"/spiːk/", pos:"verb", level:1, vi:"nói (một ngôn ngữ), phát biểu", examples:[{en:"Do you speak English?", vi:"Bạn có nói tiếng Anh không?"},{en:"She speaks very fast.", vi:"Cô ấy nói rất nhanh."}]},
  {id:49, word:"hot", ipa:"/hɑːt/", pos:"adjective", level:1, vi:"nóng", examples:[{en:"The coffee is very hot.", vi:"Cà phê rất nóng."},{en:"It is hot today.", vi:"Hôm nay trời nóng."}]},
  {id:50, word:"cold", ipa:"/koʊld/", pos:"adjective", level:1, vi:"lạnh", examples:[{en:"I feel cold.", vi:"Tôi thấy lạnh."},{en:"Winter is very cold here.", vi:"Mùa đông ở đây rất lạnh."}]}
  // ===== LÔ 2: 150 từ Level 1 tiếp theo (id 51-200) =====
  // Cách dùng: trong index.html, tìm dòng comment "THEM TU MOI O DAY"
  // (ngay trước dấu ] đóng mảng WORDS) rồi DÁN TOÀN BỘ khối dưới đây vào đó.
  // Khối đã có dấu phẩy đứng đầu nên nối liền với từ id:50 "cold" mà không cần sửa gì thêm.
  ,{id:51, word:"get", ipa:"/ɡet/", pos:"verb", level:1, vi:"lấy được, nhận được; trở nên; đến", examples:[{en:"I get up at six.", vi:"Tôi thức dậy lúc sáu giờ."},{en:"Where did you get this?", vi:"Bạn lấy cái này ở đâu vậy?"}]},
  {id:52, word:"say", ipa:"/seɪ/", pos:"verb", level:1, vi:"nói, phát biểu", examples:[{en:"What did you say?", vi:"Bạn vừa nói gì?"},{en:"Say hello to her for me.", vi:"Cho tôi gửi lời chào cô ấy."}]},
  {id:53, word:"like", ipa:"/laɪk/", pos:"verb", level:1, vi:"thích", examples:[{en:"I like this song.", vi:"Tôi thích bài hát này."},{en:"Do you like coffee?", vi:"Bạn có thích cà phê không?"}]},
  {id:54, word:"need", ipa:"/niːd/", pos:"verb", level:1, vi:"cần", examples:[{en:"I need your help.", vi:"Tôi cần bạn giúp."},{en:"We need more time.", vi:"Chúng ta cần thêm thời gian."}]},
  {id:55, word:"feel", ipa:"/fiːl/", pos:"verb", level:1, vi:"cảm thấy", examples:[{en:"I feel happy today.", vi:"Hôm nay tôi thấy vui."},{en:"How do you feel?", vi:"Bạn cảm thấy thế nào?"}]},
  {id:56, word:"become", ipa:"/bɪˈkʌm/", pos:"verb", level:1, vi:"trở thành, trở nên", examples:[{en:"She became a doctor.", vi:"Cô ấy đã trở thành bác sĩ."},{en:"It is becoming cold.", vi:"Trời đang trở lạnh."}]},
  {id:57, word:"leave", ipa:"/liːv/", pos:"verb", level:1, vi:"rời đi; để lại", examples:[{en:"I leave home at eight.", vi:"Tôi rời nhà lúc tám giờ."},{en:"Don't leave me alone.", vi:"Đừng để tôi một mình."}]},
  {id:58, word:"put", ipa:"/pʊt/", pos:"verb", level:1, vi:"đặt, để", examples:[{en:"Put the book on the table.", vi:"Đặt quyển sách lên bàn."},{en:"Where did you put my keys?", vi:"Bạn để chìa khóa của tôi ở đâu?"}]},
  {id:59, word:"mean", ipa:"/miːn/", pos:"verb", level:1, vi:"có nghĩa là; có ý", examples:[{en:"What does this word mean?", vi:"Từ này có nghĩa là gì?"},{en:"I didn't mean that.", vi:"Tôi không có ý đó."}]},
  {id:60, word:"keep", ipa:"/kiːp/", pos:"verb", level:1, vi:"giữ; tiếp tục", examples:[{en:"Keep this for me, please.", vi:"Giữ cái này giúp tôi nhé."},{en:"Keep trying!", vi:"Cứ cố gắng lên!"}]},
  {id:61, word:"let", ipa:"/let/", pos:"verb", level:1, vi:"cho phép, để cho", examples:[{en:"Let me help you.", vi:"Để tôi giúp bạn."},{en:"Let's go now.", vi:"Mình đi thôi."}]},
  {id:62, word:"begin", ipa:"/bɪˈɡɪn/", pos:"verb", level:1, vi:"bắt đầu", examples:[{en:"The class begins at nine.", vi:"Lớp học bắt đầu lúc chín giờ."},{en:"Let's begin.", vi:"Bắt đầu thôi."}]},
  {id:63, word:"seem", ipa:"/siːm/", pos:"verb", level:1, vi:"có vẻ, dường như", examples:[{en:"You seem tired.", vi:"Bạn có vẻ mệt."},{en:"It seems easy.", vi:"Việc đó có vẻ dễ."}]},
  {id:64, word:"talk", ipa:"/tɔːk/", pos:"verb", level:1, vi:"nói chuyện, trò chuyện", examples:[{en:"Let's talk later.", vi:"Mình nói chuyện sau nhé."},{en:"She is talking on the phone.", vi:"Cô ấy đang nói chuyện điện thoại."}]},
  {id:65, word:"turn", ipa:"/tɜːrn/", pos:"verb", level:1, vi:"quay, rẽ, xoay", examples:[{en:"Turn left here.", vi:"Rẽ trái ở đây."},{en:"Turn off the light.", vi:"Tắt đèn đi."}]},
  {id:66, word:"start", ipa:"/stɑːrt/", pos:"verb", level:1, vi:"bắt đầu; khởi động", examples:[{en:"Let's start the game.", vi:"Bắt đầu trò chơi nào."},{en:"The car won't start.", vi:"Xe không khởi động được."}]},
  {id:67, word:"show", ipa:"/ʃoʊ/", pos:"verb", level:1, vi:"chỉ, cho xem, trình diễn", examples:[{en:"Show me your photos.", vi:"Cho tôi xem ảnh của bạn."},{en:"Let me show you the way.", vi:"Để tôi chỉ đường cho bạn."}]},
  {id:68, word:"hear", ipa:"/hɪr/", pos:"verb", level:1, vi:"nghe, nghe thấy", examples:[{en:"I can't hear you.", vi:"Tôi không nghe rõ bạn nói."},{en:"Did you hear the news?", vi:"Bạn nghe tin chưa?"}]},
  {id:69, word:"hold", ipa:"/hoʊld/", pos:"verb", level:1, vi:"cầm, giữ, ôm", examples:[{en:"Hold my hand.", vi:"Nắm tay tôi nào."},{en:"Can you hold this bag?", vi:"Bạn cầm giúp cái túi này được không?"}]},
  {id:70, word:"bring", ipa:"/brɪŋ/", pos:"verb", level:1, vi:"mang đến, đem theo", examples:[{en:"Bring an umbrella.", vi:"Mang theo cái ô nhé."},{en:"She brought some food.", vi:"Cô ấy mang đến chút đồ ăn."}]},
  {id:71, word:"happen", ipa:"/ˈhæpən/", pos:"verb", level:1, vi:"xảy ra", examples:[{en:"What happened here?", vi:"Ở đây đã xảy ra chuyện gì?"},{en:"It happens sometimes.", vi:"Chuyện đó thỉnh thoảng xảy ra."}]},
  {id:72, word:"sit", ipa:"/sɪt/", pos:"verb", level:1, vi:"ngồi", examples:[{en:"Please sit down.", vi:"Mời ngồi."},{en:"We sat in the garden.", vi:"Chúng tôi ngồi trong vườn."}]},
  {id:73, word:"stand", ipa:"/stænd/", pos:"verb", level:1, vi:"đứng", examples:[{en:"Please stand up.", vi:"Vui lòng đứng lên."},{en:"He is standing at the door.", vi:"Anh ấy đang đứng ở cửa."}]},
  {id:74, word:"lose", ipa:"/luːz/", pos:"verb", level:1, vi:"mất; thua", examples:[{en:"Don't lose your keys.", vi:"Đừng làm mất chìa khóa."},{en:"Our team lost the game.", vi:"Đội của chúng tôi thua trận."}]},
  {id:75, word:"pay", ipa:"/peɪ/", pos:"verb", level:1, vi:"trả tiền, thanh toán", examples:[{en:"I will pay for dinner.", vi:"Tôi sẽ trả tiền bữa tối."},{en:"How much did you pay?", vi:"Bạn đã trả bao nhiêu?"}]},
  {id:76, word:"meet", ipa:"/miːt/", pos:"verb", level:1, vi:"gặp, gặp gỡ", examples:[{en:"Nice to meet you.", vi:"Rất vui được gặp bạn."},{en:"Let's meet at noon.", vi:"Mình gặp nhau lúc trưa nhé."}]},
  {id:77, word:"change", ipa:"/tʃeɪndʒ/", pos:"verb", level:1, vi:"thay đổi, đổi", examples:[{en:"I want to change my plan.", vi:"Tôi muốn đổi kế hoạch."},{en:"Things change over time.", vi:"Mọi thứ thay đổi theo thời gian."}]},
  {id:78, word:"understand", ipa:"/ˌʌndərˈstænd/", pos:"verb", level:1, vi:"hiểu", examples:[{en:"I don't understand.", vi:"Tôi không hiểu."},{en:"Do you understand me?", vi:"Bạn hiểu ý tôi không?"}]},
  {id:79, word:"watch", ipa:"/wɑːtʃ/", pos:"verb", level:1, vi:"xem, theo dõi; trông chừng", examples:[{en:"I watch TV at night.", vi:"Tôi xem ti vi vào buổi tối."},{en:"Watch your step!", vi:"Coi chừng bước chân!"}]},
  {id:80, word:"follow", ipa:"/ˈfɑːloʊ/", pos:"verb", level:1, vi:"đi theo, theo dõi, làm theo", examples:[{en:"Follow me, please.", vi:"Đi theo tôi nào."},{en:"Follow the rules.", vi:"Hãy tuân theo quy tắc."}]},
  {id:81, word:"stop", ipa:"/stɑːp/", pos:"verb", level:1, vi:"dừng lại, ngừng", examples:[{en:"Stop here, please.", vi:"Dừng ở đây nhé."},{en:"It stopped raining.", vi:"Trời đã ngừng mưa."}]},
  {id:82, word:"spend", ipa:"/spend/", pos:"verb", level:1, vi:"tiêu (tiền); dành (thời gian)", examples:[{en:"I spend too much money.", vi:"Tôi tiêu quá nhiều tiền."},{en:"We spent the day together.", vi:"Chúng tôi dành cả ngày bên nhau."}]},
  {id:83, word:"grow", ipa:"/ɡroʊ/", pos:"verb", level:1, vi:"lớn lên; trồng; phát triển", examples:[{en:"Children grow fast.", vi:"Trẻ con lớn rất nhanh."},{en:"We grow vegetables.", vi:"Chúng tôi trồng rau."}]},
  {id:84, word:"open", ipa:"/ˈoʊpən/", pos:"verb", level:1, vi:"mở", examples:[{en:"Open the box, please.", vi:"Mở cái hộp ra giúp tôi nhé."},{en:"The shop opens at eight.", vi:"Cửa hàng mở lúc tám giờ."}]},
  {id:85, word:"walk", ipa:"/wɔːk/", pos:"verb", level:1, vi:"đi bộ", examples:[{en:"I walk to work.", vi:"Tôi đi bộ đến chỗ làm."},{en:"Let's walk in the park.", vi:"Mình đi dạo trong công viên nhé."}]},
  {id:86, word:"win", ipa:"/wɪn/", pos:"verb", level:1, vi:"thắng, giành chiến thắng", examples:[{en:"I hope we win.", vi:"Tôi hy vọng chúng ta thắng."},{en:"She won the game.", vi:"Cô ấy thắng trận."}]},
  {id:87, word:"remember", ipa:"/rɪˈmembər/", pos:"verb", level:1, vi:"nhớ, ghi nhớ", examples:[{en:"I can't remember his name.", vi:"Tôi không nhớ tên anh ấy."},{en:"Remember to call me.", vi:"Nhớ gọi cho tôi nhé."}]},
  {id:88, word:"buy", ipa:"/baɪ/", pos:"verb", level:1, vi:"mua", examples:[{en:"I want to buy a gift.", vi:"Tôi muốn mua một món quà."},{en:"Where did you buy that?", vi:"Bạn mua cái đó ở đâu?"}]},
  {id:89, word:"wait", ipa:"/weɪt/", pos:"verb", level:1, vi:"chờ, đợi", examples:[{en:"Please wait a moment.", vi:"Vui lòng đợi một lát."},{en:"I am waiting for you.", vi:"Tôi đang đợi bạn."}]},
  {id:90, word:"send", ipa:"/send/", pos:"verb", level:1, vi:"gửi", examples:[{en:"I will send you a message.", vi:"Tôi sẽ gửi tin nhắn cho bạn."},{en:"Send it by email.", vi:"Gửi nó qua email nhé."}]},
  {id:91, word:"build", ipa:"/bɪld/", pos:"verb", level:1, vi:"xây, xây dựng", examples:[{en:"They build houses.", vi:"Họ xây nhà."},{en:"We built a strong team.", vi:"Chúng tôi xây dựng một đội mạnh."}]},
  {id:92, word:"stay", ipa:"/steɪ/", pos:"verb", level:1, vi:"ở lại, lưu lại", examples:[{en:"Stay here with me.", vi:"Ở lại đây với tôi nhé."},{en:"We stayed at a hotel.", vi:"Chúng tôi ở khách sạn."}]},
  {id:93, word:"fall", ipa:"/fɔːl/", pos:"verb", level:1, vi:"rơi, ngã", examples:[{en:"Be careful, don't fall.", vi:"Cẩn thận, đừng ngã."},{en:"Leaves fall in autumn.", vi:"Lá rụng vào mùa thu."}]},
  {id:94, word:"run", ipa:"/rʌn/", pos:"verb", level:1, vi:"chạy; điều hành", examples:[{en:"I run every morning.", vi:"Tôi chạy bộ mỗi sáng."},{en:"She runs a small shop.", vi:"Cô ấy điều hành một cửa hàng nhỏ."}]},
  {id:95, word:"sleep", ipa:"/sliːp/", pos:"verb", level:1, vi:"ngủ", examples:[{en:"I sleep eight hours.", vi:"Tôi ngủ tám tiếng."},{en:"The baby is sleeping.", vi:"Em bé đang ngủ."}]},
  {id:96, word:"study", ipa:"/ˈstʌdi/", pos:"verb", level:1, vi:"học, nghiên cứu", examples:[{en:"I study English at night.", vi:"Tôi học tiếng Anh vào buổi tối."},{en:"She studies hard.", vi:"Cô ấy học chăm chỉ."}]},
  {id:97, word:"drive", ipa:"/draɪv/", pos:"verb", level:1, vi:"lái xe", examples:[{en:"Can you drive?", vi:"Bạn biết lái xe không?"},{en:"He drives to work.", vi:"Anh ấy lái xe đi làm."}]},
  {id:98, word:"sell", ipa:"/sel/", pos:"verb", level:1, vi:"bán", examples:[{en:"They sell fresh fruit.", vi:"Họ bán trái cây tươi."},{en:"I want to sell my old phone.", vi:"Tôi muốn bán chiếc điện thoại cũ."}]},
  {id:99, word:"teach", ipa:"/tiːtʃ/", pos:"verb", level:1, vi:"dạy, giảng dạy", examples:[{en:"She teaches English.", vi:"Cô ấy dạy tiếng Anh."},{en:"Can you teach me?", vi:"Bạn dạy tôi được không?"}]},
  {id:100, word:"call", ipa:"/kɔːl/", pos:"verb", level:1, vi:"gọi; gọi điện", examples:[{en:"Call me tonight.", vi:"Tối nay gọi cho tôi nhé."},{en:"They call him Tom.", vi:"Họ gọi anh ấy là Tom."}]},
  {id:101, word:"move", ipa:"/muːv/", pos:"verb", level:1, vi:"di chuyển; chuyển nhà", examples:[{en:"Please move your car.", vi:"Vui lòng di chuyển xe của bạn."},{en:"We moved to a new house.", vi:"Chúng tôi chuyển đến nhà mới."}]},
  {id:102, word:"live", ipa:"/lɪv/", pos:"verb", level:1, vi:"sống, sinh sống", examples:[{en:"I live in the city.", vi:"Tôi sống ở thành phố."},{en:"Where do you live?", vi:"Bạn sống ở đâu?"}]},
  {id:103, word:"try", ipa:"/traɪ/", pos:"verb", level:1, vi:"thử; cố gắng", examples:[{en:"Try this cake.", vi:"Thử miếng bánh này đi."},{en:"I will try my best.", vi:"Tôi sẽ cố gắng hết sức."}]},
  {id:104, word:"drink", ipa:"/drɪŋk/", pos:"verb", level:1, vi:"uống", examples:[{en:"I drink water every day.", vi:"Tôi uống nước mỗi ngày."},{en:"Do you want something to drink?", vi:"Bạn có muốn uống gì không?"}]},
  {id:105, word:"listen", ipa:"/ˈlɪsən/", pos:"verb", level:1, vi:"nghe, lắng nghe", examples:[{en:"Listen to me, please.", vi:"Hãy lắng nghe tôi."},{en:"I listen to music every day.", vi:"Tôi nghe nhạc mỗi ngày."}]},
  {id:106, word:"word", ipa:"/wɜːrd/", pos:"noun", level:1, vi:"từ; lời nói", examples:[{en:"What does this word mean?", vi:"Từ này nghĩa là gì?"},{en:"Say a few words.", vi:"Hãy nói vài lời."}]},
  {id:107, word:"place", ipa:"/pleɪs/", pos:"noun", level:1, vi:"nơi, chỗ, địa điểm", examples:[{en:"This is a nice place.", vi:"Đây là một nơi đẹp."},{en:"Let's find a place to eat.", vi:"Mình tìm chỗ ăn nhé."}]},
  {id:108, word:"problem", ipa:"/ˈprɑːbləm/", pos:"noun", level:1, vi:"vấn đề, rắc rối", examples:[{en:"We have a small problem.", vi:"Chúng ta có một vấn đề nhỏ."},{en:"No problem!", vi:"Không sao đâu!"}]},
  {id:109, word:"hand", ipa:"/hænd/", pos:"noun", level:1, vi:"bàn tay", examples:[{en:"Wash your hands.", vi:"Rửa tay đi."},{en:"She raised her hand.", vi:"Cô ấy giơ tay lên."}]},
  {id:110, word:"part", ipa:"/pɑːrt/", pos:"noun", level:1, vi:"phần, bộ phận", examples:[{en:"This is the best part.", vi:"Đây là phần hay nhất."},{en:"It is part of my job.", vi:"Đó là một phần công việc của tôi."}]},
  {id:111, word:"eye", ipa:"/aɪ/", pos:"noun", level:1, vi:"mắt", examples:[{en:"She has beautiful eyes.", vi:"Cô ấy có đôi mắt đẹp."},{en:"Close your eyes.", vi:"Nhắm mắt lại."}]},
  {id:112, word:"week", ipa:"/wiːk/", pos:"noun", level:1, vi:"tuần", examples:[{en:"I work five days a week.", vi:"Tôi làm việc năm ngày một tuần."},{en:"See you next week.", vi:"Hẹn gặp tuần sau."}]},
  {id:113, word:"number", ipa:"/ˈnʌmbər/", pos:"noun", level:1, vi:"con số; số lượng", examples:[{en:"What is your phone number?", vi:"Số điện thoại của bạn là gì?"},{en:"Pick a number.", vi:"Chọn một con số đi."}]},
  {id:114, word:"group", ipa:"/ɡruːp/", pos:"noun", level:1, vi:"nhóm", examples:[{en:"We work in a group.", vi:"Chúng tôi làm việc theo nhóm."},{en:"A group of students came.", vi:"Một nhóm học sinh đã đến."}]},
  {id:115, word:"room", ipa:"/ruːm/", pos:"noun", level:1, vi:"phòng; không gian", examples:[{en:"My room is small.", vi:"Phòng tôi nhỏ."},{en:"There is no room here.", vi:"Ở đây không còn chỗ."}]},
  {id:116, word:"mother", ipa:"/ˈmʌðər/", pos:"noun", level:1, vi:"mẹ", examples:[{en:"My mother cooks well.", vi:"Mẹ tôi nấu ăn ngon."},{en:"She is a good mother.", vi:"Cô ấy là một người mẹ tốt."}]},
  {id:117, word:"father", ipa:"/ˈfɑːðər/", pos:"noun", level:1, vi:"bố, cha", examples:[{en:"My father works hard.", vi:"Bố tôi làm việc chăm chỉ."},{en:"His father is a teacher.", vi:"Bố anh ấy là giáo viên."}]},
  {id:118, word:"car", ipa:"/kɑːr/", pos:"noun", level:1, vi:"xe hơi, ô tô", examples:[{en:"I have a new car.", vi:"Tôi có một chiếc xe mới."},{en:"The car is very fast.", vi:"Chiếc xe chạy rất nhanh."}]},
  {id:119, word:"city", ipa:"/ˈsɪti/", pos:"noun", level:1, vi:"thành phố", examples:[{en:"I live in a big city.", vi:"Tôi sống ở một thành phố lớn."},{en:"This city is beautiful.", vi:"Thành phố này thật đẹp."}]},
  {id:120, word:"name", ipa:"/neɪm/", pos:"noun", level:1, vi:"tên", examples:[{en:"What is your name?", vi:"Tên bạn là gì?"},{en:"My name is Lan.", vi:"Tên tôi là Lan."}]},
  {id:121, word:"country", ipa:"/ˈkʌntri/", pos:"noun", level:1, vi:"đất nước, quốc gia; vùng quê", examples:[{en:"Vietnam is a beautiful country.", vi:"Việt Nam là một đất nước xinh đẹp."},{en:"They live in the country.", vi:"Họ sống ở vùng quê."}]},
  {id:122, word:"story", ipa:"/ˈstɔːri/", pos:"noun", level:1, vi:"câu chuyện", examples:[{en:"Tell me a story.", vi:"Kể cho tôi một câu chuyện đi."},{en:"It is a long story.", vi:"Đó là một câu chuyện dài."}]},
  {id:123, word:"job", ipa:"/dʒɑːb/", pos:"noun", level:1, vi:"công việc, nghề", examples:[{en:"She has a new job.", vi:"Cô ấy có công việc mới."},{en:"I like my job.", vi:"Tôi thích công việc của mình."}]},
  {id:124, word:"night", ipa:"/naɪt/", pos:"noun", level:1, vi:"ban đêm, buổi tối", examples:[{en:"Good night!", vi:"Chúc ngủ ngon!"},{en:"I study at night.", vi:"Tôi học vào ban đêm."}]},
  {id:125, word:"morning", ipa:"/ˈmɔːrnɪŋ/", pos:"noun", level:1, vi:"buổi sáng", examples:[{en:"Good morning!", vi:"Chào buổi sáng!"},{en:"I run in the morning.", vi:"Tôi chạy bộ vào buổi sáng."}]},
  {id:126, word:"minute", ipa:"/ˈmɪnɪt/", pos:"noun", level:1, vi:"phút", examples:[{en:"Wait a minute.", vi:"Đợi một phút."},{en:"It takes five minutes.", vi:"Việc đó mất năm phút."}]},
  {id:127, word:"hour", ipa:"/ˈaʊər/", pos:"noun", level:1, vi:"giờ, tiếng đồng hồ", examples:[{en:"I waited for an hour.", vi:"Tôi đã đợi một tiếng."},{en:"The trip takes two hours.", vi:"Chuyến đi mất hai tiếng."}]},
  {id:128, word:"month", ipa:"/mʌnθ/", pos:"noun", level:1, vi:"tháng", examples:[{en:"There are twelve months in a year.", vi:"Một năm có mười hai tháng."},{en:"See you next month.", vi:"Hẹn gặp tháng sau."}]},
  {id:129, word:"body", ipa:"/ˈbɑːdi/", pos:"noun", level:1, vi:"cơ thể, thân thể", examples:[{en:"Exercise is good for the body.", vi:"Tập thể dục tốt cho cơ thể."},{en:"My whole body hurts.", vi:"Cả người tôi đau nhức."}]},
  {id:130, word:"head", ipa:"/hed/", pos:"noun", level:1, vi:"đầu", examples:[{en:"My head hurts.", vi:"Tôi bị đau đầu."},{en:"She nodded her head.", vi:"Cô ấy gật đầu."}]},
  {id:131, word:"face", ipa:"/feɪs/", pos:"noun", level:1, vi:"khuôn mặt", examples:[{en:"She has a kind face.", vi:"Cô ấy có gương mặt phúc hậu."},{en:"Wash your face.", vi:"Rửa mặt đi."}]},
  {id:132, word:"door", ipa:"/dɔːr/", pos:"noun", level:1, vi:"cửa, cửa ra vào", examples:[{en:"Please close the door.", vi:"Vui lòng đóng cửa."},{en:"Someone is at the door.", vi:"Có người ở ngoài cửa."}]},
  {id:133, word:"street", ipa:"/striːt/", pos:"noun", level:1, vi:"đường phố, con phố", examples:[{en:"The street is busy.", vi:"Con phố rất đông đúc."},{en:"I live on this street.", vi:"Tôi sống trên con phố này."}]},
  {id:134, word:"table", ipa:"/ˈteɪbl/", pos:"noun", level:1, vi:"cái bàn", examples:[{en:"Put it on the table.", vi:"Để nó lên bàn."},{en:"We sat at the table.", vi:"Chúng tôi ngồi vào bàn."}]},
  {id:135, word:"phone", ipa:"/foʊn/", pos:"noun", level:1, vi:"điện thoại", examples:[{en:"My phone is dead.", vi:"Điện thoại của tôi hết pin."},{en:"Answer the phone.", vi:"Nghe điện thoại đi."}]},
  {id:136, word:"game", ipa:"/ɡeɪm/", pos:"noun", level:1, vi:"trò chơi; trận đấu", examples:[{en:"Let's play a game.", vi:"Mình chơi một trò chơi nhé."},{en:"We watched the game.", vi:"Chúng tôi xem trận đấu."}]},
  {id:137, word:"music", ipa:"/ˈmjuːzɪk/", pos:"noun", level:1, vi:"âm nhạc", examples:[{en:"I love music.", vi:"Tôi yêu âm nhạc."},{en:"She plays soft music.", vi:"Cô ấy mở nhạc nhẹ nhàng."}]},
  {id:138, word:"tree", ipa:"/triː/", pos:"noun", level:1, vi:"cây, cây cối", examples:[{en:"There is a big tree in the garden.", vi:"Có một cái cây lớn trong vườn."},{en:"Birds live in trees.", vi:"Chim sống trên cây."}]},
  {id:139, word:"animal", ipa:"/ˈænɪml/", pos:"noun", level:1, vi:"động vật, con vật", examples:[{en:"I love animals.", vi:"Tôi yêu động vật."},{en:"The dog is a friendly animal.", vi:"Chó là một con vật thân thiện."}]},
  {id:140, word:"dog", ipa:"/dɔːɡ/", pos:"noun", level:1, vi:"con chó", examples:[{en:"My dog is very cute.", vi:"Con chó của tôi rất dễ thương."},{en:"The dog is sleeping.", vi:"Con chó đang ngủ."}]},
  {id:141, word:"cat", ipa:"/kæt/", pos:"noun", level:1, vi:"con mèo", examples:[{en:"The cat is on the chair.", vi:"Con mèo đang ở trên ghế."},{en:"She has two cats.", vi:"Cô ấy nuôi hai con mèo."}]},
  {id:142, word:"coffee", ipa:"/ˈkɔːfi/", pos:"noun", level:1, vi:"cà phê", examples:[{en:"I drink coffee every morning.", vi:"Tôi uống cà phê mỗi sáng."},{en:"This coffee is hot.", vi:"Cà phê này nóng."}]},
  {id:143, word:"bread", ipa:"/bred/", pos:"noun", level:1, vi:"bánh mì", examples:[{en:"I eat bread for breakfast.", vi:"Tôi ăn bánh mì vào bữa sáng."},{en:"Buy some bread, please.", vi:"Mua chút bánh mì giúp tôi nhé."}]},
  {id:144, word:"milk", ipa:"/mɪlk/", pos:"noun", level:1, vi:"sữa", examples:[{en:"Children drink milk.", vi:"Trẻ em uống sữa."},{en:"I want some milk.", vi:"Tôi muốn một chút sữa."}]},
  {id:145, word:"air", ipa:"/er/", pos:"noun", level:1, vi:"không khí", examples:[{en:"The air is fresh here.", vi:"Không khí ở đây trong lành."},{en:"Open the window for fresh air.", vi:"Mở cửa sổ cho thoáng khí."}]},
  {id:146, word:"sun", ipa:"/sʌn/", pos:"noun", level:1, vi:"mặt trời", examples:[{en:"The sun is bright today.", vi:"Hôm nay mặt trời rất sáng."},{en:"The sun rises in the east.", vi:"Mặt trời mọc ở hướng đông."}]},
  {id:147, word:"rain", ipa:"/reɪn/", pos:"noun", level:1, vi:"mưa, cơn mưa", examples:[{en:"I love the sound of rain.", vi:"Tôi thích tiếng mưa."},{en:"We stayed home because of the rain.", vi:"Chúng tôi ở nhà vì trời mưa."}]},
  {id:148, word:"color", ipa:"/ˈkʌlər/", pos:"noun", level:1, vi:"màu sắc", examples:[{en:"What is your favorite color?", vi:"Màu yêu thích của bạn là gì?"},{en:"Blue is a calm color.", vi:"Xanh dương là một màu dịu mắt."}]},
  {id:149, word:"paper", ipa:"/ˈpeɪpər/", pos:"noun", level:1, vi:"giấy, tờ giấy", examples:[{en:"Write it on paper.", vi:"Viết nó ra giấy đi."},{en:"I need a piece of paper.", vi:"Tôi cần một tờ giấy."}]},
  {id:150, word:"picture", ipa:"/ˈpɪktʃər/", pos:"noun", level:1, vi:"bức tranh, bức ảnh", examples:[{en:"This is a nice picture.", vi:"Đây là một bức ảnh đẹp."},{en:"She drew a picture.", vi:"Cô ấy vẽ một bức tranh."}]},
  {id:151, word:"window", ipa:"/ˈwɪndoʊ/", pos:"noun", level:1, vi:"cửa sổ", examples:[{en:"Open the window, please.", vi:"Mở cửa sổ giúp tôi nhé."},{en:"The cat is by the window.", vi:"Con mèo ở cạnh cửa sổ."}]},
  {id:152, word:"road", ipa:"/roʊd/", pos:"noun", level:1, vi:"con đường", examples:[{en:"This road is very long.", vi:"Con đường này rất dài."},{en:"Be careful on the road.", vi:"Cẩn thận khi đi đường."}]},
  {id:153, word:"river", ipa:"/ˈrɪvər/", pos:"noun", level:1, vi:"dòng sông, con sông", examples:[{en:"We swam in the river.", vi:"Chúng tôi bơi dưới sông."},{en:"The river is very clean.", vi:"Dòng sông rất trong."}]},
  {id:154, word:"sea", ipa:"/siː/", pos:"noun", level:1, vi:"biển", examples:[{en:"I love the sea.", vi:"Tôi yêu biển."},{en:"The sea is calm today.", vi:"Hôm nay biển lặng."}]},
  {id:155, word:"sky", ipa:"/skaɪ/", pos:"noun", level:1, vi:"bầu trời", examples:[{en:"The sky is blue.", vi:"Bầu trời xanh."},{en:"Look at the stars in the sky.", vi:"Nhìn những vì sao trên bầu trời kìa."}]},
  {id:156, word:"old", ipa:"/oʊld/", pos:"adjective", level:1, vi:"già; cũ", examples:[{en:"My grandfather is very old.", vi:"Ông tôi đã rất già."},{en:"This is an old house.", vi:"Đây là một ngôi nhà cũ."}]},
  {id:157, word:"young", ipa:"/jʌŋ/", pos:"adjective", level:1, vi:"trẻ, nhỏ tuổi", examples:[{en:"She is still young.", vi:"Cô ấy vẫn còn trẻ."},{en:"Young children need sleep.", vi:"Trẻ nhỏ cần ngủ nhiều."}]},
  {id:158, word:"long", ipa:"/lɔːŋ/", pos:"adjective", level:1, vi:"dài", examples:[{en:"It was a long day.", vi:"Đó là một ngày dài."},{en:"She has long hair.", vi:"Cô ấy có mái tóc dài."}]},
  {id:159, word:"short", ipa:"/ʃɔːrt/", pos:"adjective", level:1, vi:"ngắn; thấp", examples:[{en:"This is a short story.", vi:"Đây là một câu chuyện ngắn."},{en:"He is short but strong.", vi:"Anh ấy thấp nhưng khỏe."}]},
  {id:160, word:"high", ipa:"/haɪ/", pos:"adjective", level:1, vi:"cao", examples:[{en:"The mountain is very high.", vi:"Ngọn núi rất cao."},{en:"Prices are high now.", vi:"Giá cả bây giờ cao."}]},
  {id:161, word:"low", ipa:"/loʊ/", pos:"adjective", level:1, vi:"thấp", examples:[{en:"The price is low.", vi:"Giá thấp."},{en:"Speak in a low voice.", vi:"Hãy nói nhỏ thôi."}]},
  {id:162, word:"easy", ipa:"/ˈiːzi/", pos:"adjective", level:1, vi:"dễ, dễ dàng", examples:[{en:"This question is easy.", vi:"Câu hỏi này dễ."},{en:"Learning can be easy and fun.", vi:"Học có thể dễ và vui."}]},
  {id:163, word:"hard", ipa:"/hɑːrd/", pos:"adjective", level:1, vi:"khó; cứng", examples:[{en:"This test is hard.", vi:"Bài kiểm tra này khó."},{en:"The bed is too hard.", vi:"Cái giường cứng quá."}]},
  {id:164, word:"fast", ipa:"/fæst/", pos:"adjective", level:1, vi:"nhanh", examples:[{en:"He is a fast runner.", vi:"Anh ấy chạy nhanh."},{en:"This is a fast car.", vi:"Đây là một chiếc xe nhanh."}]},
  {id:165, word:"slow", ipa:"/sloʊ/", pos:"adjective", level:1, vi:"chậm", examples:[{en:"The bus is very slow.", vi:"Xe buýt rất chậm."},{en:"Please speak slowly.", vi:"Vui lòng nói chậm thôi."}]},
  {id:166, word:"early", ipa:"/ˈɜːrli/", pos:"adjective / adverb", level:1, vi:"sớm", examples:[{en:"I wake up early.", vi:"Tôi dậy sớm."},{en:"We had an early dinner.", vi:"Chúng tôi ăn tối sớm."}]},
  {id:167, word:"late", ipa:"/leɪt/", pos:"adjective / adverb", level:1, vi:"muộn, trễ", examples:[{en:"Sorry, I am late.", vi:"Xin lỗi, tôi đến muộn."},{en:"Don't sleep late.", vi:"Đừng ngủ muộn."}]},
  {id:168, word:"right", ipa:"/raɪt/", pos:"adjective", level:1, vi:"đúng; bên phải", examples:[{en:"You are right.", vi:"Bạn nói đúng."},{en:"Turn to the right.", vi:"Rẽ sang phải."}]},
  {id:169, word:"wrong", ipa:"/rɔːŋ/", pos:"adjective", level:1, vi:"sai, không đúng", examples:[{en:"That answer is wrong.", vi:"Câu trả lời đó sai."},{en:"Something is wrong.", vi:"Có gì đó không ổn."}]},
  {id:170, word:"true", ipa:"/truː/", pos:"adjective", level:1, vi:"đúng sự thật, có thật", examples:[{en:"Is that true?", vi:"Điều đó có thật không?"},{en:"It is a true story.", vi:"Đó là một câu chuyện có thật."}]},
  {id:171, word:"beautiful", ipa:"/ˈbjuːtɪfl/", pos:"adjective", level:1, vi:"đẹp, xinh đẹp", examples:[{en:"What a beautiful day!", vi:"Một ngày thật đẹp!"},{en:"She has a beautiful smile.", vi:"Cô ấy có nụ cười xinh."}]},
  {id:172, word:"important", ipa:"/ɪmˈpɔːrtnt/", pos:"adjective", level:1, vi:"quan trọng", examples:[{en:"This is very important.", vi:"Điều này rất quan trọng."},{en:"Family is important to me.", vi:"Gia đình rất quan trọng với tôi."}]},
  {id:173, word:"different", ipa:"/ˈdɪfrənt/", pos:"adjective", level:1, vi:"khác, khác biệt", examples:[{en:"We have different ideas.", vi:"Chúng ta có những ý tưởng khác nhau."},{en:"This one is a little different.", vi:"Cái này hơi khác một chút."}]},
  {id:174, word:"same", ipa:"/seɪm/", pos:"adjective", level:1, vi:"giống nhau, như nhau", examples:[{en:"We have the same name.", vi:"Chúng tôi trùng tên."},{en:"It is the same as before.", vi:"Vẫn giống như trước."}]},
  {id:175, word:"ready", ipa:"/ˈredi/", pos:"adjective", level:1, vi:"sẵn sàng", examples:[{en:"Are you ready?", vi:"Bạn sẵn sàng chưa?"},{en:"Dinner is ready.", vi:"Bữa tối đã sẵn sàng."}]},
  {id:176, word:"free", ipa:"/friː/", pos:"adjective", level:1, vi:"rảnh; miễn phí; tự do", examples:[{en:"Are you free today?", vi:"Hôm nay bạn rảnh không?"},{en:"This app is free.", vi:"Ứng dụng này miễn phí."}]},
  {id:177, word:"full", ipa:"/fʊl/", pos:"adjective", level:1, vi:"đầy; no", examples:[{en:"The cup is full.", vi:"Cái cốc đầy rồi."},{en:"I am full, thank you.", vi:"Tôi no rồi, cảm ơn."}]},
  {id:178, word:"empty", ipa:"/ˈempti/", pos:"adjective", level:1, vi:"trống, rỗng", examples:[{en:"The box is empty.", vi:"Cái hộp trống không."},{en:"The streets are empty at night.", vi:"Đường phố vắng tanh vào ban đêm."}]},
  {id:179, word:"strong", ipa:"/strɔːŋ/", pos:"adjective", level:1, vi:"khỏe, mạnh, mạnh mẽ", examples:[{en:"He is very strong.", vi:"Anh ấy rất khỏe."},{en:"She has a strong mind.", vi:"Cô ấy có ý chí mạnh mẽ."}]},
  {id:180, word:"weak", ipa:"/wiːk/", pos:"adjective", level:1, vi:"yếu", examples:[{en:"I feel weak today.", vi:"Hôm nay tôi thấy yếu trong người."},{en:"The signal is weak here.", vi:"Sóng ở đây yếu."}]},
  {id:181, word:"clean", ipa:"/kliːn/", pos:"adjective", level:1, vi:"sạch, sạch sẽ", examples:[{en:"The room is very clean.", vi:"Căn phòng rất sạch sẽ."},{en:"Keep your hands clean.", vi:"Hãy giữ tay sạch sẽ."}]},
  {id:182, word:"dirty", ipa:"/ˈdɜːrti/", pos:"adjective", level:1, vi:"bẩn, dơ", examples:[{en:"My shoes are dirty.", vi:"Giày của tôi bị bẩn."},{en:"Don't drink dirty water.", vi:"Đừng uống nước bẩn."}]},
  {id:183, word:"rich", ipa:"/rɪtʃ/", pos:"adjective", level:1, vi:"giàu, giàu có", examples:[{en:"He is a rich man.", vi:"Ông ấy là một người giàu."},{en:"The soup is rich and tasty.", vi:"Món súp đậm đà và ngon."}]},
  {id:184, word:"poor", ipa:"/pʊr/", pos:"adjective", level:1, vi:"nghèo; tội nghiệp", examples:[{en:"They were very poor.", vi:"Họ từng rất nghèo."},{en:"Poor thing, are you okay?", vi:"Tội nghiệp, bạn có sao không?"}]},
  {id:185, word:"nice", ipa:"/naɪs/", pos:"adjective", level:1, vi:"tốt, dễ chịu, đẹp", examples:[{en:"He is a nice person.", vi:"Anh ấy là người tốt."},{en:"The weather is nice today.", vi:"Hôm nay thời tiết đẹp."}]},
  {id:186, word:"now", ipa:"/naʊ/", pos:"adverb", level:1, vi:"bây giờ, ngay lúc này", examples:[{en:"I am busy now.", vi:"Bây giờ tôi đang bận."},{en:"Let's start now.", vi:"Bắt đầu ngay bây giờ thôi."}]},
  {id:187, word:"here", ipa:"/hɪr/", pos:"adverb", level:1, vi:"ở đây", examples:[{en:"I live here.", vi:"Tôi sống ở đây."},{en:"Sign here, please.", vi:"Vui lòng ký vào đây."}]},
  {id:188, word:"there", ipa:"/ðer/", pos:"adverb", level:1, vi:"ở đó, ở kia", examples:[{en:"Put it over there.", vi:"Để nó ở đằng kia."},{en:"I have never been there.", vi:"Tôi chưa từng đến đó."}]},
  {id:189, word:"today", ipa:"/təˈdeɪ/", pos:"adverb / noun", level:1, vi:"hôm nay", examples:[{en:"What day is it today?", vi:"Hôm nay là thứ mấy?"},{en:"I am free today.", vi:"Hôm nay tôi rảnh."}]},
  {id:190, word:"very", ipa:"/ˈveri/", pos:"adverb", level:1, vi:"rất", examples:[{en:"It is very cold.", vi:"Trời rất lạnh."},{en:"Thank you very much.", vi:"Cảm ơn bạn rất nhiều."}]},
  {id:191, word:"more", ipa:"/mɔːr/", pos:"adverb / adjective", level:1, vi:"nhiều hơn, thêm", examples:[{en:"I need more time.", vi:"Tôi cần thêm thời gian."},{en:"Can I have some more?", vi:"Cho tôi xin thêm một chút được không?"}]},
  {id:192, word:"also", ipa:"/ˈɔːlsoʊ/", pos:"adverb", level:1, vi:"cũng; ngoài ra", examples:[{en:"I also like tea.", vi:"Tôi cũng thích trà."},{en:"She is smart and also kind.", vi:"Cô ấy thông minh và cũng tốt bụng."}]},
  {id:193, word:"again", ipa:"/əˈɡen/", pos:"adverb", level:1, vi:"lại, lần nữa", examples:[{en:"Say it again, please.", vi:"Nói lại lần nữa đi."},{en:"Let's meet again soon.", vi:"Mình sớm gặp lại nhé."}]},
  {id:194, word:"always", ipa:"/ˈɔːlweɪz/", pos:"adverb", level:1, vi:"luôn luôn", examples:[{en:"She is always happy.", vi:"Cô ấy lúc nào cũng vui."},{en:"I always drink coffee in the morning.", vi:"Tôi luôn uống cà phê vào buổi sáng."}]},
  {id:195, word:"never", ipa:"/ˈnevər/", pos:"adverb", level:1, vi:"không bao giờ", examples:[{en:"I never give up.", vi:"Tôi không bao giờ bỏ cuộc."},{en:"She never eats meat.", vi:"Cô ấy không bao giờ ăn thịt."}]},
  {id:196, word:"together", ipa:"/təˈɡeðər/", pos:"adverb", level:1, vi:"cùng nhau", examples:[{en:"Let's work together.", vi:"Mình làm cùng nhau nhé."},{en:"They live together.", vi:"Họ sống cùng nhau."}]},
  {id:197, word:"maybe", ipa:"/ˈmeɪbi/", pos:"adverb", level:1, vi:"có lẽ, có thể", examples:[{en:"Maybe you are right.", vi:"Có lẽ bạn đúng."},{en:"Maybe it will rain.", vi:"Có thể trời sẽ mưa."}]},
  {id:198, word:"only", ipa:"/ˈoʊnli/", pos:"adverb", level:1, vi:"chỉ; duy nhất", examples:[{en:"I have only one dollar.", vi:"Tôi chỉ có một đô la."},{en:"She is the only child.", vi:"Cô ấy là con một."}]},
  {id:199, word:"really", ipa:"/ˈriːəli/", pos:"adverb", level:1, vi:"thật sự; thật là", examples:[{en:"I really like it.", vi:"Tôi thật sự thích nó."},{en:"Are you really sure?", vi:"Bạn thật sự chắc chứ?"}]},
  {id:200, word:"still", ipa:"/stɪl/", pos:"adverb", level:1, vi:"vẫn, vẫn còn", examples:[{en:"He is still sleeping.", vi:"Anh ấy vẫn đang ngủ."},{en:"Are you still there?", vi:"Bạn vẫn còn đó chứ?"}]}
  // ===== LÔ 3: 200 từ Level 1 tiếp theo (id 201-400) =====
  // Dán toàn bộ khối này vào sau từ id:200 "still" trong mảng WORDS (trước dấu ]).
  // Khối đã có sẵn dấu phẩy đứng đầu nên nối liền, không cần sửa gì thêm.
  ,{id:201, word:"add", ipa:"/æd/", pos:"verb", level:1, vi:"thêm vào; cộng", examples:[{en:"Add some salt to the soup.", vi:"Thêm chút muối vào súp."},{en:"Add your name to the list.", vi:"Thêm tên bạn vào danh sách."}]},
  {id:202, word:"answer", ipa:"/ˈænsər/", pos:"verb", level:1, vi:"trả lời", examples:[{en:"Please answer my question.", vi:"Vui lòng trả lời câu hỏi của tôi."},{en:"She didn't answer the phone.", vi:"Cô ấy không nghe máy."}]},
  {id:203, word:"believe", ipa:"/bɪˈliːv/", pos:"verb", level:1, vi:"tin, tin tưởng", examples:[{en:"I believe you.", vi:"Tôi tin bạn."},{en:"Do you believe in luck?", vi:"Bạn có tin vào may mắn không?"}]},
  {id:204, word:"break", ipa:"/breɪk/", pos:"verb", level:1, vi:"làm vỡ, làm gãy; nghỉ giải lao", examples:[{en:"Don't break the glass.", vi:"Đừng làm vỡ cái cốc."},{en:"Let's take a break.", vi:"Mình nghỉ một chút nhé."}]},
  {id:205, word:"carry", ipa:"/ˈkæri/", pos:"verb", level:1, vi:"mang, vác, mang theo", examples:[{en:"Can you carry this box?", vi:"Bạn mang giúp cái hộp này được không?"},{en:"She carries a small bag.", vi:"Cô ấy mang một cái túi nhỏ."}]},
  {id:206, word:"catch", ipa:"/kætʃ/", pos:"verb", level:1, vi:"bắt, chụp; bắt kịp (xe)", examples:[{en:"Catch the ball!", vi:"Bắt bóng đi!"},{en:"I need to catch the bus.", vi:"Tôi cần bắt kịp xe buýt."}]},
  {id:207, word:"choose", ipa:"/tʃuːz/", pos:"verb", level:1, vi:"chọn, lựa chọn", examples:[{en:"Choose one, please.", vi:"Chọn một cái nhé."},{en:"It's hard to choose.", vi:"Khó mà chọn được."}]},
  {id:208, word:"close", ipa:"/kloʊz/", pos:"verb", level:1, vi:"đóng (lại)", examples:[{en:"Please close the door.", vi:"Vui lòng đóng cửa."},{en:"The shop closes at ten.", vi:"Cửa hàng đóng cửa lúc mười giờ."}]},
  {id:209, word:"count", ipa:"/kaʊnt/", pos:"verb", level:1, vi:"đếm", examples:[{en:"Count to ten.", vi:"Đếm đến mười đi."},{en:"She counted the money.", vi:"Cô ấy đếm tiền."}]},
  {id:210, word:"cover", ipa:"/ˈkʌvər/", pos:"verb", level:1, vi:"che, phủ, đậy", examples:[{en:"Cover the food, please.", vi:"Đậy thức ăn lại nhé."},{en:"Snow covered the road.", vi:"Tuyết phủ kín con đường."}]},
  {id:211, word:"decide", ipa:"/dɪˈsaɪd/", pos:"verb", level:1, vi:"quyết định", examples:[{en:"I can't decide.", vi:"Tôi không quyết định được."},{en:"We decided to stay home.", vi:"Chúng tôi quyết định ở nhà."}]},
  {id:212, word:"describe", ipa:"/dɪˈskraɪb/", pos:"verb", level:1, vi:"miêu tả, mô tả", examples:[{en:"Can you describe him?", vi:"Bạn mô tả anh ấy được không?"},{en:"Describe what you saw.", vi:"Hãy kể lại những gì bạn thấy."}]},
  {id:213, word:"draw", ipa:"/drɔː/", pos:"verb", level:1, vi:"vẽ; kéo", examples:[{en:"She likes to draw.", vi:"Cô ấy thích vẽ."},{en:"Draw a circle here.", vi:"Vẽ một vòng tròn ở đây."}]},
  {id:214, word:"drop", ipa:"/drɑːp/", pos:"verb", level:1, vi:"làm rơi; giảm xuống", examples:[{en:"Don't drop your phone.", vi:"Đừng làm rơi điện thoại."},{en:"Prices dropped last week.", vi:"Giá đã giảm tuần trước."}]},
  {id:215, word:"enjoy", ipa:"/ɪnˈdʒɔɪ/", pos:"verb", level:1, vi:"tận hưởng, thích thú", examples:[{en:"Enjoy your meal!", vi:"Chúc ngon miệng!"},{en:"I really enjoy this song.", vi:"Tôi thật sự thích bài hát này."}]},
  {id:216, word:"explain", ipa:"/ɪkˈspleɪn/", pos:"verb", level:1, vi:"giải thích", examples:[{en:"Please explain it again.", vi:"Vui lòng giải thích lại."},{en:"Can you explain this word?", vi:"Bạn giải thích từ này được không?"}]},
  {id:217, word:"fill", ipa:"/fɪl/", pos:"verb", level:1, vi:"làm đầy, đổ đầy; điền", examples:[{en:"Fill the cup with water.", vi:"Đổ đầy nước vào cốc."},{en:"Fill in your name here.", vi:"Điền tên bạn vào đây."}]},
  {id:218, word:"finish", ipa:"/ˈfɪnɪʃ/", pos:"verb", level:1, vi:"hoàn thành, làm xong", examples:[{en:"Finish your homework first.", vi:"Làm xong bài tập trước đã."},{en:"I finished the book.", vi:"Tôi đã đọc xong cuốn sách."}]},
  {id:219, word:"fix", ipa:"/fɪks/", pos:"verb", level:1, vi:"sửa, sửa chữa", examples:[{en:"Can you fix my bike?", vi:"Bạn sửa giúp xe đạp của tôi được không?"},{en:"He fixed the problem.", vi:"Anh ấy đã khắc phục vấn đề."}]},
  {id:220, word:"fly", ipa:"/flaɪ/", pos:"verb", level:1, vi:"bay", examples:[{en:"Birds fly south in winter.", vi:"Chim bay về phương nam vào mùa đông."},{en:"We will fly to Da Nang.", vi:"Chúng tôi sẽ bay đến Đà Nẵng."}]},
  {id:221, word:"forget", ipa:"/fərˈɡet/", pos:"verb", level:1, vi:"quên", examples:[{en:"Don't forget your keys.", vi:"Đừng quên chìa khóa."},{en:"I forgot her name.", vi:"Tôi quên tên cô ấy rồi."}]},
  {id:222, word:"hate", ipa:"/heɪt/", pos:"verb", level:1, vi:"ghét", examples:[{en:"I hate waiting.", vi:"Tôi ghét phải chờ đợi."},{en:"She hates cold weather.", vi:"Cô ấy ghét trời lạnh."}]},
  {id:223, word:"hope", ipa:"/hoʊp/", pos:"verb", level:1, vi:"hy vọng, mong", examples:[{en:"I hope you feel better.", vi:"Mong bạn sớm khỏe."},{en:"We hope to see you soon.", vi:"Chúng tôi mong sớm gặp bạn."}]},
  {id:224, word:"hurt", ipa:"/hɜːrt/", pos:"verb", level:1, vi:"làm đau; đau", examples:[{en:"My leg hurts.", vi:"Chân tôi đau."},{en:"Did I hurt you?", vi:"Tôi có làm bạn đau không?"}]},
  {id:225, word:"join", ipa:"/dʒɔɪn/", pos:"verb", level:1, vi:"tham gia, gia nhập", examples:[{en:"Join us for dinner.", vi:"Tham gia bữa tối với chúng tôi nhé."},{en:"She joined the club.", vi:"Cô ấy gia nhập câu lạc bộ."}]},
  {id:226, word:"jump", ipa:"/dʒʌmp/", pos:"verb", level:1, vi:"nhảy, nhảy lên", examples:[{en:"The cat jumped on the bed.", vi:"Con mèo nhảy lên giường."},{en:"Don't jump on the sofa.", vi:"Đừng nhảy trên ghế sô-pha."}]},
  {id:227, word:"kick", ipa:"/kɪk/", pos:"verb", level:1, vi:"đá", examples:[{en:"He kicked the ball.", vi:"Anh ấy đá quả bóng."},{en:"Don't kick the door.", vi:"Đừng đá vào cửa."}]},
  {id:228, word:"kill", ipa:"/kɪl/", pos:"verb", level:1, vi:"giết, làm chết", examples:[{en:"Don't kill the spider.", vi:"Đừng giết con nhện."},{en:"The frost killed the plants.", vi:"Sương giá làm chết cây."}]},
  {id:229, word:"laugh", ipa:"/læf/", pos:"verb", level:1, vi:"cười", examples:[{en:"We laughed all night.", vi:"Chúng tôi cười cả đêm."},{en:"Don't laugh at me.", vi:"Đừng cười nhạo tôi."}]},
  {id:230, word:"lie", ipa:"/laɪ/", pos:"verb", level:1, vi:"nói dối; nằm", examples:[{en:"Don't lie to me.", vi:"Đừng nói dối tôi."},{en:"She lay down to rest.", vi:"Cô ấy nằm xuống nghỉ."}]},
  {id:231, word:"marry", ipa:"/ˈmæri/", pos:"verb", level:1, vi:"kết hôn, cưới", examples:[{en:"Will you marry me?", vi:"Em lấy anh nhé?"},{en:"They married last year.", vi:"Họ cưới nhau năm ngoái."}]},
  {id:232, word:"miss", ipa:"/mɪs/", pos:"verb", level:1, vi:"nhớ; lỡ, bỏ lỡ", examples:[{en:"I miss my family.", vi:"Tôi nhớ gia đình."},{en:"Don't miss the train.", vi:"Đừng lỡ chuyến tàu."}]},
  {id:233, word:"notice", ipa:"/ˈnoʊtɪs/", pos:"verb", level:1, vi:"để ý, nhận ra", examples:[{en:"Did you notice her new haircut?", vi:"Bạn có để ý kiểu tóc mới của cô ấy không?"},{en:"I didn't notice you there.", vi:"Tôi không để ý là bạn ở đó."}]},
  {id:234, word:"offer", ipa:"/ˈɔːfər/", pos:"verb", level:1, vi:"đề nghị, mời, tặng", examples:[{en:"She offered me some tea.", vi:"Cô ấy mời tôi uống trà."},{en:"They offered him a job.", vi:"Họ đề nghị anh ấy một công việc."}]},
  {id:235, word:"pass", ipa:"/pæs/", pos:"verb", level:1, vi:"đưa qua; vượt qua; đậu (kỳ thi)", examples:[{en:"Pass me the salt, please.", vi:"Đưa giúp tôi lọ muối nhé."},{en:"She passed the exam.", vi:"Cô ấy đã đậu kỳ thi."}]},
  {id:236, word:"plan", ipa:"/plæn/", pos:"verb", level:1, vi:"lên kế hoạch, dự định", examples:[{en:"We plan to travel this summer.", vi:"Chúng tôi dự định đi du lịch hè này."},{en:"Let's plan a trip.", vi:"Mình lên kế hoạch cho một chuyến đi nhé."}]},
  {id:237, word:"point", ipa:"/pɔɪnt/", pos:"verb", level:1, vi:"chỉ (tay), chỉ vào", examples:[{en:"Don't point at people.", vi:"Đừng chỉ tay vào người khác."},{en:"She pointed to the map.", vi:"Cô ấy chỉ vào tấm bản đồ."}]},
  {id:238, word:"prepare", ipa:"/prɪˈper/", pos:"verb", level:1, vi:"chuẩn bị", examples:[{en:"I need to prepare dinner.", vi:"Tôi cần chuẩn bị bữa tối."},{en:"Prepare for the test.", vi:"Hãy chuẩn bị cho bài kiểm tra."}]},
  {id:239, word:"pull", ipa:"/pʊl/", pos:"verb", level:1, vi:"kéo", examples:[{en:"Pull the door, don't push.", vi:"Kéo cửa, đừng đẩy."},{en:"He pulled the rope.", vi:"Anh ấy kéo sợi dây."}]},
  {id:240, word:"push", ipa:"/pʊʃ/", pos:"verb", level:1, vi:"đẩy; nhấn", examples:[{en:"Push the button.", vi:"Nhấn nút đi."},{en:"Push the door to open it.", vi:"Đẩy cửa để mở."}]},
  {id:241, word:"raise", ipa:"/reɪz/", pos:"verb", level:1, vi:"giơ lên, nâng lên; nuôi dạy", examples:[{en:"Raise your hand to ask.", vi:"Giơ tay lên để hỏi."},{en:"They raised three children.", vi:"Họ nuôi dạy ba người con."}]},
  {id:242, word:"reach", ipa:"/riːtʃ/", pos:"verb", level:1, vi:"với tới; đến nơi", examples:[{en:"I can't reach the shelf.", vi:"Tôi với không tới cái kệ."},{en:"We reached home late.", vi:"Chúng tôi về đến nhà muộn."}]},
  {id:243, word:"receive", ipa:"/rɪˈsiːv/", pos:"verb", level:1, vi:"nhận, nhận được", examples:[{en:"I received your letter.", vi:"Tôi đã nhận được thư của bạn."},{en:"She received a gift.", vi:"Cô ấy nhận được một món quà."}]},
  {id:244, word:"repeat", ipa:"/rɪˈpiːt/", pos:"verb", level:1, vi:"lặp lại, nhắc lại", examples:[{en:"Please repeat that.", vi:"Vui lòng nhắc lại điều đó."},{en:"Repeat after me.", vi:"Hãy nhắc lại theo tôi."}]},
  {id:245, word:"reply", ipa:"/rɪˈplaɪ/", pos:"verb", level:1, vi:"trả lời, hồi đáp", examples:[{en:"She didn't reply to my email.", vi:"Cô ấy không trả lời email của tôi."},{en:"Please reply soon.", vi:"Vui lòng sớm hồi đáp."}]},
  {id:246, word:"rest", ipa:"/rest/", pos:"verb", level:1, vi:"nghỉ ngơi", examples:[{en:"You should rest.", vi:"Bạn nên nghỉ ngơi."},{en:"Let's rest for a while.", vi:"Mình nghỉ một lát nhé."}]},
  {id:247, word:"return", ipa:"/rɪˈtɜːrn/", pos:"verb", level:1, vi:"trở về; trả lại", examples:[{en:"I will return tomorrow.", vi:"Tôi sẽ trở về vào ngày mai."},{en:"Return the book to the library.", vi:"Trả sách lại cho thư viện."}]},
  {id:248, word:"ride", ipa:"/raɪd/", pos:"verb", level:1, vi:"cưỡi; đi (xe đạp, ngựa)", examples:[{en:"I ride my bike to school.", vi:"Tôi đạp xe đến trường."},{en:"Can you ride a horse?", vi:"Bạn biết cưỡi ngựa không?"}]},
  {id:249, word:"ring", ipa:"/rɪŋ/", pos:"verb", level:1, vi:"reo, rung (chuông)", examples:[{en:"The phone is ringing.", vi:"Điện thoại đang reo."},{en:"Ring the bell, please.", vi:"Vui lòng rung chuông."}]},
  {id:250, word:"rise", ipa:"/raɪz/", pos:"verb", level:1, vi:"mọc; lên cao; tăng", examples:[{en:"The sun rises early in summer.", vi:"Mặt trời mọc sớm vào mùa hè."},{en:"Prices keep rising.", vi:"Giá cả cứ tăng lên."}]},
  {id:251, word:"save", ipa:"/seɪv/", pos:"verb", level:1, vi:"cứu; tiết kiệm; lưu", examples:[{en:"He saved the child.", vi:"Anh ấy đã cứu đứa trẻ."},{en:"I save money every month.", vi:"Tôi tiết kiệm tiền mỗi tháng."}]},
  {id:252, word:"serve", ipa:"/sɜːrv/", pos:"verb", level:1, vi:"phục vụ, dọn (món)", examples:[{en:"They serve breakfast at seven.", vi:"Họ phục vụ bữa sáng lúc bảy giờ."},{en:"She served us tea.", vi:"Cô ấy mời chúng tôi trà."}]},
  {id:253, word:"set", ipa:"/set/", pos:"verb", level:1, vi:"đặt, bày; (mặt trời) lặn", examples:[{en:"Set the table, please.", vi:"Dọn bàn ăn giúp tôi nhé."},{en:"The sun sets in the west.", vi:"Mặt trời lặn ở hướng tây."}]},
  {id:254, word:"shake", ipa:"/ʃeɪk/", pos:"verb", level:1, vi:"lắc, rung; bắt tay", examples:[{en:"Shake the bottle well.", vi:"Lắc đều chai."},{en:"They shook hands.", vi:"Họ bắt tay nhau."}]},
  {id:255, word:"share", ipa:"/ʃer/", pos:"verb", level:1, vi:"chia sẻ, dùng chung", examples:[{en:"Let's share the cake.", vi:"Mình chia nhau cái bánh nhé."},{en:"She shared her story.", vi:"Cô ấy chia sẻ câu chuyện của mình."}]},
  {id:256, word:"shout", ipa:"/ʃaʊt/", pos:"verb", level:1, vi:"la, hét, hô to", examples:[{en:"Don't shout, please.", vi:"Đừng la hét nhé."},{en:"He shouted for help.", vi:"Anh ấy hét lên cầu cứu."}]},
  {id:257, word:"sign", ipa:"/saɪn/", pos:"verb", level:1, vi:"ký (tên)", examples:[{en:"Sign here, please.", vi:"Vui lòng ký vào đây."},{en:"She signed the letter.", vi:"Cô ấy ký vào lá thư."}]},
  {id:258, word:"sing", ipa:"/sɪŋ/", pos:"verb", level:1, vi:"hát", examples:[{en:"She sings very well.", vi:"Cô ấy hát rất hay."},{en:"Let's sing together.", vi:"Mình cùng hát nhé."}]},
  {id:259, word:"smile", ipa:"/smaɪl/", pos:"verb", level:1, vi:"mỉm cười", examples:[{en:"She smiled at me.", vi:"Cô ấy mỉm cười với tôi."},{en:"Smile for the photo!", vi:"Cười lên để chụp ảnh nào!"}]},
  {id:260, word:"smell", ipa:"/smel/", pos:"verb", level:1, vi:"ngửi; có mùi", examples:[{en:"This flower smells nice.", vi:"Bông hoa này thơm."},{en:"I can smell coffee.", vi:"Tôi ngửi thấy mùi cà phê."}]},
  {id:261, word:"art", ipa:"/ɑːrt/", pos:"noun", level:1, vi:"nghệ thuật", examples:[{en:"She loves art.", vi:"Cô ấy yêu nghệ thuật."},{en:"This is a work of art.", vi:"Đây là một tác phẩm nghệ thuật."}]},
  {id:262, word:"baby", ipa:"/ˈbeɪbi/", pos:"noun", level:1, vi:"em bé", examples:[{en:"The baby is sleeping.", vi:"Em bé đang ngủ."},{en:"She has a new baby.", vi:"Cô ấy vừa có em bé."}]},
  {id:263, word:"ball", ipa:"/bɔːl/", pos:"noun", level:1, vi:"quả bóng", examples:[{en:"The kids are playing with a ball.", vi:"Bọn trẻ đang chơi bóng."},{en:"Throw the ball to me.", vi:"Ném bóng cho tôi đi."}]},
  {id:264, word:"bank", ipa:"/bæŋk/", pos:"noun", level:1, vi:"ngân hàng; bờ (sông)", examples:[{en:"I need to go to the bank.", vi:"Tôi cần đến ngân hàng."},{en:"We sat by the river bank.", vi:"Chúng tôi ngồi bên bờ sông."}]},
  {id:265, word:"beach", ipa:"/biːtʃ/", pos:"noun", level:1, vi:"bãi biển", examples:[{en:"Let's go to the beach.", vi:"Mình đi biển nhé."},{en:"The beach is crowded today.", vi:"Hôm nay bãi biển đông người."}]},
  {id:266, word:"bed", ipa:"/bed/", pos:"noun", level:1, vi:"cái giường", examples:[{en:"Go to bed now.", vi:"Đi ngủ thôi."},{en:"The bed is very soft.", vi:"Cái giường rất êm."}]},
  {id:267, word:"bird", ipa:"/bɜːrd/", pos:"noun", level:1, vi:"con chim", examples:[{en:"A bird is singing.", vi:"Một con chim đang hót."},{en:"Birds fly in the sky.", vi:"Chim bay trên trời."}]},
  {id:268, word:"blood", ipa:"/blʌd/", pos:"noun", level:1, vi:"máu", examples:[{en:"There is blood on the floor.", vi:"Có máu trên sàn."},{en:"Blood is red.", vi:"Máu màu đỏ."}]},
  {id:269, word:"boat", ipa:"/boʊt/", pos:"noun", level:1, vi:"chiếc thuyền", examples:[{en:"We rode a small boat.", vi:"Chúng tôi đi một chiếc thuyền nhỏ."},{en:"The boat is on the river.", vi:"Chiếc thuyền ở trên sông."}]},
  {id:270, word:"boy", ipa:"/bɔɪ/", pos:"noun", level:1, vi:"cậu bé, con trai", examples:[{en:"The boy is playing.", vi:"Cậu bé đang chơi."},{en:"He is a good boy.", vi:"Cậu ấy là một cậu bé ngoan."}]},
  {id:271, word:"girl", ipa:"/ɡɜːrl/", pos:"noun", level:1, vi:"cô bé, con gái", examples:[{en:"The girl is reading.", vi:"Cô bé đang đọc sách."},{en:"She is a kind girl.", vi:"Cô ấy là một cô bé tốt bụng."}]},
  {id:272, word:"brother", ipa:"/ˈbrʌðər/", pos:"noun", level:1, vi:"anh trai, em trai", examples:[{en:"I have one brother.", vi:"Tôi có một người anh trai."},{en:"My brother is tall.", vi:"Anh trai tôi cao."}]},
  {id:273, word:"sister", ipa:"/ˈsɪstər/", pos:"noun", level:1, vi:"chị gái, em gái", examples:[{en:"She is my older sister.", vi:"Cô ấy là chị gái tôi."},{en:"My sister loves music.", vi:"Em gái tôi thích âm nhạc."}]},
  {id:274, word:"building", ipa:"/ˈbɪldɪŋ/", pos:"noun", level:1, vi:"tòa nhà", examples:[{en:"That building is very tall.", vi:"Tòa nhà đó rất cao."},{en:"I work in this building.", vi:"Tôi làm việc trong tòa nhà này."}]},
  {id:275, word:"bus", ipa:"/bʌs/", pos:"noun", level:1, vi:"xe buýt", examples:[{en:"I take the bus to work.", vi:"Tôi đi xe buýt đến chỗ làm."},{en:"The bus is late today.", vi:"Hôm nay xe buýt đến muộn."}]},
  {id:276, word:"business", ipa:"/ˈbɪznəs/", pos:"noun", level:1, vi:"kinh doanh, việc làm ăn", examples:[{en:"He runs a small business.", vi:"Anh ấy kinh doanh nhỏ."},{en:"Business is good this year.", vi:"Năm nay việc làm ăn tốt."}]},
  {id:277, word:"cake", ipa:"/keɪk/", pos:"noun", level:1, vi:"bánh ngọt", examples:[{en:"I made a birthday cake.", vi:"Tôi làm một cái bánh sinh nhật."},{en:"This cake is sweet.", vi:"Cái bánh này ngọt."}]},
  {id:278, word:"card", ipa:"/kɑːrd/", pos:"noun", level:1, vi:"tấm thiệp; thẻ", examples:[{en:"She sent me a card.", vi:"Cô ấy gửi tôi một tấm thiệp."},{en:"Where is my bank card?", vi:"Thẻ ngân hàng của tôi đâu rồi?"}]},
  {id:279, word:"chair", ipa:"/tʃer/", pos:"noun", level:1, vi:"cái ghế", examples:[{en:"Please sit on this chair.", vi:"Mời ngồi vào ghế này."},{en:"The chair is broken.", vi:"Cái ghế bị gãy."}]},
  {id:280, word:"class", ipa:"/klæs/", pos:"noun", level:1, vi:"lớp học; tiết học", examples:[{en:"My English class is at nine.", vi:"Lớp tiếng Anh của tôi lúc chín giờ."},{en:"There are thirty students in the class.", vi:"Lớp có ba mươi học sinh."}]},
  {id:281, word:"clock", ipa:"/klɑːk/", pos:"noun", level:1, vi:"đồng hồ (treo tường, để bàn)", examples:[{en:"The clock on the wall is slow.", vi:"Cái đồng hồ trên tường chạy chậm."},{en:"Look at the clock.", vi:"Nhìn đồng hồ đi."}]},
  {id:282, word:"cloud", ipa:"/klaʊd/", pos:"noun", level:1, vi:"đám mây", examples:[{en:"There are no clouds today.", vi:"Hôm nay trời không có mây."},{en:"The clouds are gray.", vi:"Những đám mây xám xịt."}]},
  {id:283, word:"club", ipa:"/klʌb/", pos:"noun", level:1, vi:"câu lạc bộ", examples:[{en:"I joined a book club.", vi:"Tôi tham gia một câu lạc bộ sách."},{en:"The club meets on Fridays.", vi:"Câu lạc bộ họp vào thứ Sáu."}]},
  {id:284, word:"computer", ipa:"/kəmˈpjuːtər/", pos:"noun", level:1, vi:"máy tính", examples:[{en:"My computer is slow.", vi:"Máy tính của tôi chậm."},{en:"She works on a computer all day.", vi:"Cô ấy làm việc với máy tính cả ngày."}]},
  {id:285, word:"corner", ipa:"/ˈkɔːrnər/", pos:"noun", level:1, vi:"góc", examples:[{en:"The shop is on the corner.", vi:"Cửa hàng ở góc đường."},{en:"Put it in the corner.", vi:"Để nó vào góc nhà."}]},
  {id:286, word:"cup", ipa:"/kʌp/", pos:"noun", level:1, vi:"cái cốc, tách", examples:[{en:"A cup of tea, please.", vi:"Cho tôi một tách trà."},{en:"The cup is empty.", vi:"Cái cốc rỗng."}]},
  {id:287, word:"date", ipa:"/deɪt/", pos:"noun", level:1, vi:"ngày tháng; buổi hẹn hò", examples:[{en:"What is the date today?", vi:"Hôm nay là ngày mấy?"},{en:"We went on a date.", vi:"Chúng tôi đi hẹn hò."}]},
  {id:288, word:"death", ipa:"/deθ/", pos:"noun", level:1, vi:"cái chết, sự qua đời", examples:[{en:"His death was very sad.", vi:"Sự ra đi của ông ấy thật buồn."},{en:"They were sad after the dog's death.", vi:"Họ buồn sau khi chú chó qua đời."}]},
  {id:289, word:"dinner", ipa:"/ˈdɪnər/", pos:"noun", level:1, vi:"bữa tối", examples:[{en:"Dinner is ready.", vi:"Bữa tối đã sẵn sàng."},{en:"We had dinner together.", vi:"Chúng tôi ăn tối cùng nhau."}]},
  {id:290, word:"doctor", ipa:"/ˈdɑːktər/", pos:"noun", level:1, vi:"bác sĩ", examples:[{en:"You should see a doctor.", vi:"Bạn nên đi khám bác sĩ."},{en:"My sister is a doctor.", vi:"Chị tôi là bác sĩ."}]},
  {id:291, word:"dollar", ipa:"/ˈdɑːlər/", pos:"noun", level:1, vi:"đô la", examples:[{en:"It costs ten dollars.", vi:"Nó giá mười đô la."},{en:"I have only one dollar.", vi:"Tôi chỉ có một đô la."}]},
  {id:292, word:"dress", ipa:"/dres/", pos:"noun", level:1, vi:"váy, đầm", examples:[{en:"She is wearing a red dress.", vi:"Cô ấy đang mặc một chiếc váy đỏ."},{en:"This dress is beautiful.", vi:"Chiếc váy này đẹp."}]},
  {id:293, word:"earth", ipa:"/ɜːrθ/", pos:"noun", level:1, vi:"trái đất; mặt đất", examples:[{en:"We must protect the earth.", vi:"Chúng ta phải bảo vệ trái đất."},{en:"The earth goes around the sun.", vi:"Trái đất quay quanh mặt trời."}]},
  {id:294, word:"evening", ipa:"/ˈiːvnɪŋ/", pos:"noun", level:1, vi:"buổi tối, chiều tối", examples:[{en:"Good evening!", vi:"Chào buổi tối!"},{en:"We walk in the evening.", vi:"Chúng tôi đi dạo vào buổi tối."}]},
  {id:295, word:"example", ipa:"/ɪɡˈzæmpl/", pos:"noun", level:1, vi:"ví dụ", examples:[{en:"Can you give an example?", vi:"Bạn cho một ví dụ được không?"},{en:"For example, apples are fruit.", vi:"Ví dụ, táo là trái cây."}]},
  {id:296, word:"fact", ipa:"/fækt/", pos:"noun", level:1, vi:"sự thật, sự việc", examples:[{en:"That is a fact.", vi:"Đó là sự thật."},{en:"In fact, I agree with you.", vi:"Thật ra, tôi đồng ý với bạn."}]},
  {id:297, word:"farm", ipa:"/fɑːrm/", pos:"noun", level:1, vi:"nông trại, trang trại", examples:[{en:"They live on a farm.", vi:"Họ sống ở một nông trại."},{en:"The farm has many cows.", vi:"Nông trại có nhiều con bò."}]},
  {id:298, word:"field", ipa:"/fiːld/", pos:"noun", level:1, vi:"cánh đồng; sân (bóng)", examples:[{en:"The field is full of flowers.", vi:"Cánh đồng đầy hoa."},{en:"We played on the field.", vi:"Chúng tôi chơi trên sân."}]},
  {id:299, word:"film", ipa:"/fɪlm/", pos:"noun", level:1, vi:"bộ phim", examples:[{en:"Let's watch a film tonight.", vi:"Tối nay mình xem phim nhé."},{en:"This film is very long.", vi:"Bộ phim này rất dài."}]},
  {id:300, word:"fire", ipa:"/ˈfaɪər/", pos:"noun", level:1, vi:"lửa; đám cháy", examples:[{en:"Don't play with fire.", vi:"Đừng nghịch lửa."},{en:"The fire is warm.", vi:"Ngọn lửa ấm áp."}]},
  {id:301, word:"fish", ipa:"/fɪʃ/", pos:"noun", level:1, vi:"con cá", examples:[{en:"We caught three fish.", vi:"Chúng tôi bắt được ba con cá."},{en:"I like to eat fish.", vi:"Tôi thích ăn cá."}]},
  {id:302, word:"flower", ipa:"/ˈflaʊər/", pos:"noun", level:1, vi:"bông hoa", examples:[{en:"These flowers smell nice.", vi:"Những bông hoa này thơm."},{en:"He gave her a flower.", vi:"Anh ấy tặng cô ấy một bông hoa."}]},
  {id:303, word:"foot", ipa:"/fʊt/", pos:"noun", level:1, vi:"bàn chân", examples:[{en:"My foot hurts.", vi:"Bàn chân tôi đau."},{en:"We went there on foot.", vi:"Chúng tôi đi bộ đến đó."}]},
  {id:304, word:"forest", ipa:"/ˈfɔːrɪst/", pos:"noun", level:1, vi:"khu rừng", examples:[{en:"Many animals live in the forest.", vi:"Nhiều loài vật sống trong rừng."},{en:"The forest is quiet.", vi:"Khu rừng yên tĩnh."}]},
  {id:305, word:"fun", ipa:"/fʌn/", pos:"noun", level:1, vi:"niềm vui, sự vui vẻ", examples:[{en:"We had a lot of fun.", vi:"Chúng tôi đã rất vui."},{en:"Learning can be fun.", vi:"Học có thể rất vui."}]},
  {id:306, word:"future", ipa:"/ˈfjuːtʃər/", pos:"noun", level:1, vi:"tương lai", examples:[{en:"Think about your future.", vi:"Hãy nghĩ về tương lai của bạn."},{en:"Nobody knows the future.", vi:"Không ai biết được tương lai."}]},
  {id:307, word:"garden", ipa:"/ˈɡɑːrdn/", pos:"noun", level:1, vi:"khu vườn", examples:[{en:"We grow vegetables in the garden.", vi:"Chúng tôi trồng rau trong vườn."},{en:"The garden is beautiful in spring.", vi:"Khu vườn đẹp vào mùa xuân."}]},
  {id:308, word:"gift", ipa:"/ɡɪft/", pos:"noun", level:1, vi:"món quà", examples:[{en:"Thank you for the gift.", vi:"Cảm ơn vì món quà."},{en:"I bought a gift for my mother.", vi:"Tôi mua một món quà cho mẹ."}]},
  {id:309, word:"glass", ipa:"/ɡlæs/", pos:"noun", level:1, vi:"cái ly; thủy tinh", examples:[{en:"A glass of water, please.", vi:"Cho tôi một ly nước."},{en:"The window is made of glass.", vi:"Cửa sổ làm bằng thủy tinh."}]},
  {id:310, word:"gold", ipa:"/ɡoʊld/", pos:"noun", level:1, vi:"vàng (kim loại)", examples:[{en:"The ring is made of gold.", vi:"Chiếc nhẫn làm bằng vàng."},{en:"Gold is very expensive.", vi:"Vàng rất đắt."}]},
  {id:311, word:"ground", ipa:"/ɡraʊnd/", pos:"noun", level:1, vi:"mặt đất", examples:[{en:"The ball fell on the ground.", vi:"Quả bóng rơi xuống đất."},{en:"We sat on the ground.", vi:"Chúng tôi ngồi trên mặt đất."}]},
  {id:312, word:"hair", ipa:"/her/", pos:"noun", level:1, vi:"tóc", examples:[{en:"She has long black hair.", vi:"Cô ấy có mái tóc đen dài."},{en:"I need to cut my hair.", vi:"Tôi cần cắt tóc."}]},
  {id:313, word:"half", ipa:"/hæf/", pos:"noun", level:1, vi:"một nửa", examples:[{en:"I ate half of the cake.", vi:"Tôi ăn nửa cái bánh."},{en:"Half of the students are girls.", vi:"Một nửa số học sinh là nữ."}]},
  {id:314, word:"health", ipa:"/helθ/", pos:"noun", level:1, vi:"sức khỏe", examples:[{en:"Health is more important than money.", vi:"Sức khỏe quan trọng hơn tiền bạc."},{en:"She is in good health.", vi:"Cô ấy có sức khỏe tốt."}]},
  {id:315, word:"heart", ipa:"/hɑːrt/", pos:"noun", level:1, vi:"trái tim", examples:[{en:"My heart is beating fast.", vi:"Tim tôi đập nhanh."},{en:"She has a kind heart.", vi:"Cô ấy có một trái tim nhân hậu."}]},
  {id:316, word:"history", ipa:"/ˈhɪstri/", pos:"noun", level:1, vi:"lịch sử", examples:[{en:"I love studying history.", vi:"Tôi thích học lịch sử."},{en:"This city has a long history.", vi:"Thành phố này có lịch sử lâu đời."}]},
  {id:317, word:"home", ipa:"/hoʊm/", pos:"noun", level:1, vi:"nhà, mái ấm", examples:[{en:"I want to go home.", vi:"Tôi muốn về nhà."},{en:"There is no place like home.", vi:"Không đâu bằng nhà mình."}]},
  {id:318, word:"hospital", ipa:"/ˈhɑːspɪtl/", pos:"noun", level:1, vi:"bệnh viện", examples:[{en:"He is in the hospital.", vi:"Anh ấy đang ở bệnh viện."},{en:"The hospital is near my house.", vi:"Bệnh viện ở gần nhà tôi."}]},
  {id:319, word:"hotel", ipa:"/hoʊˈtel/", pos:"noun", level:1, vi:"khách sạn", examples:[{en:"We stayed at a nice hotel.", vi:"Chúng tôi ở một khách sạn đẹp."},{en:"The hotel is by the sea.", vi:"Khách sạn ở cạnh biển."}]},
  {id:320, word:"idea", ipa:"/aɪˈdiːə/", pos:"noun", level:1, vi:"ý tưởng, ý kiến", examples:[{en:"That's a great idea!", vi:"Một ý tưởng tuyệt vời!"},{en:"I have no idea.", vi:"Tôi chẳng có ý gì cả."}]},
  {id:321, word:"island", ipa:"/ˈaɪlənd/", pos:"noun", level:1, vi:"hòn đảo", examples:[{en:"They live on a small island.", vi:"Họ sống trên một hòn đảo nhỏ."},{en:"The island is beautiful.", vi:"Hòn đảo rất đẹp."}]},
  {id:322, word:"key", ipa:"/kiː/", pos:"noun", level:1, vi:"chìa khóa", examples:[{en:"I lost my keys.", vi:"Tôi làm mất chìa khóa."},{en:"Where is the car key?", vi:"Chìa khóa xe đâu rồi?"}]},
  {id:323, word:"kid", ipa:"/kɪd/", pos:"noun", level:1, vi:"đứa trẻ, đứa nhỏ", examples:[{en:"The kids are playing outside.", vi:"Bọn trẻ đang chơi bên ngoài."},{en:"She has two kids.", vi:"Cô ấy có hai đứa con."}]},
  {id:324, word:"king", ipa:"/kɪŋ/", pos:"noun", level:1, vi:"vua, nhà vua", examples:[{en:"The king lived in a big palace.", vi:"Nhà vua sống trong một cung điện lớn."},{en:"He is the king of the country.", vi:"Ông ấy là vua của đất nước."}]},
  {id:325, word:"kitchen", ipa:"/ˈkɪtʃɪn/", pos:"noun", level:1, vi:"nhà bếp", examples:[{en:"My mother is in the kitchen.", vi:"Mẹ tôi đang ở trong bếp."},{en:"The kitchen is clean.", vi:"Nhà bếp sạch sẽ."}]},
  {id:326, word:"land", ipa:"/lænd/", pos:"noun", level:1, vi:"đất, vùng đất", examples:[{en:"They bought some land.", vi:"Họ mua một mảnh đất."},{en:"The land here is good for rice.", vi:"Đất ở đây tốt cho cây lúa."}]},
  {id:327, word:"language", ipa:"/ˈlæŋɡwɪdʒ/", pos:"noun", level:1, vi:"ngôn ngữ", examples:[{en:"English is a useful language.", vi:"Tiếng Anh là một ngôn ngữ hữu ích."},{en:"How many languages do you speak?", vi:"Bạn nói được bao nhiêu thứ tiếng?"}]},
  {id:328, word:"leg", ipa:"/leɡ/", pos:"noun", level:1, vi:"cái chân (cẳng chân)", examples:[{en:"My legs are tired.", vi:"Chân tôi mỏi."},{en:"The table has four legs.", vi:"Cái bàn có bốn chân."}]},
  {id:329, word:"lesson", ipa:"/ˈlesn/", pos:"noun", level:1, vi:"bài học", examples:[{en:"Today's lesson is easy.", vi:"Bài học hôm nay dễ."},{en:"We learn a lesson from mistakes.", vi:"Chúng ta rút ra bài học từ sai lầm."}]},
  {id:330, word:"letter", ipa:"/ˈletər/", pos:"noun", level:1, vi:"lá thư; chữ cái", examples:[{en:"I wrote a letter to my friend.", vi:"Tôi viết một lá thư cho bạn."},{en:"The word 'cat' has three letters.", vi:"Từ 'cat' có ba chữ cái."}]},
  {id:331, word:"able", ipa:"/ˈeɪbl/", pos:"adjective", level:1, vi:"có thể, có khả năng", examples:[{en:"She is able to swim.", vi:"Cô ấy có thể bơi."},{en:"Are you able to come?", vi:"Bạn có thể đến không?"}]},
  {id:332, word:"afraid", ipa:"/əˈfreɪd/", pos:"adjective", level:1, vi:"sợ, e ngại", examples:[{en:"Don't be afraid.", vi:"Đừng sợ."},{en:"I am afraid of dogs.", vi:"Tôi sợ chó."}]},
  {id:333, word:"angry", ipa:"/ˈæŋɡri/", pos:"adjective", level:1, vi:"tức giận", examples:[{en:"Why are you angry?", vi:"Sao bạn lại giận?"},{en:"He was angry with me.", vi:"Anh ấy giận tôi."}]},
  {id:334, word:"bad", ipa:"/bæd/", pos:"adjective", level:1, vi:"xấu, tệ, dở", examples:[{en:"The weather is bad today.", vi:"Hôm nay thời tiết xấu."},{en:"That's not a bad idea.", vi:"Đó không phải là ý tồi."}]},
  {id:335, word:"black", ipa:"/blæk/", pos:"adjective", level:1, vi:"màu đen", examples:[{en:"She has a black cat.", vi:"Cô ấy có một con mèo đen."},{en:"I like black coffee.", vi:"Tôi thích cà phê đen."}]},
  {id:336, word:"white", ipa:"/waɪt/", pos:"adjective", level:1, vi:"màu trắng", examples:[{en:"He wore a white shirt.", vi:"Anh ấy mặc một chiếc áo trắng."},{en:"The snow is white.", vi:"Tuyết màu trắng."}]},
  {id:337, word:"red", ipa:"/red/", pos:"adjective", level:1, vi:"màu đỏ", examples:[{en:"She has a red dress.", vi:"Cô ấy có một chiếc váy đỏ."},{en:"The apple is red.", vi:"Quả táo màu đỏ."}]},
  {id:338, word:"blue", ipa:"/bluː/", pos:"adjective", level:1, vi:"màu xanh dương", examples:[{en:"The sky is blue.", vi:"Bầu trời xanh."},{en:"He bought a blue car.", vi:"Anh ấy mua một chiếc xe màu xanh."}]},
  {id:339, word:"green", ipa:"/ɡriːn/", pos:"adjective", level:1, vi:"màu xanh lá", examples:[{en:"The leaves are green.", vi:"Lá cây màu xanh."},{en:"She likes the green dress.", vi:"Cô ấy thích chiếc váy xanh lá."}]},
  {id:340, word:"busy", ipa:"/ˈbɪzi/", pos:"adjective", level:1, vi:"bận rộn", examples:[{en:"I am busy today.", vi:"Hôm nay tôi bận."},{en:"The street is busy.", vi:"Con phố đông đúc."}]},
  {id:341, word:"careful", ipa:"/ˈkerfl/", pos:"adjective", level:1, vi:"cẩn thận", examples:[{en:"Be careful on the road.", vi:"Cẩn thận khi đi đường."},{en:"She is a careful driver.", vi:"Cô ấy là một người lái xe cẩn thận."}]},
  {id:342, word:"cheap", ipa:"/tʃiːp/", pos:"adjective", level:1, vi:"rẻ", examples:[{en:"This shirt is cheap.", vi:"Cái áo này rẻ."},{en:"We found a cheap hotel.", vi:"Chúng tôi tìm được một khách sạn rẻ."}]},
  {id:343, word:"expensive", ipa:"/ɪkˈspensɪv/", pos:"adjective", level:1, vi:"đắt, mắc", examples:[{en:"This phone is too expensive.", vi:"Cái điện thoại này đắt quá."},{en:"Gold is expensive.", vi:"Vàng thì đắt."}]},
  {id:344, word:"clear", ipa:"/klɪr/", pos:"adjective", level:1, vi:"rõ ràng; trong (nước, trời)", examples:[{en:"The sky is clear today.", vi:"Hôm nay trời quang."},{en:"Is my explanation clear?", vi:"Tôi giải thích có rõ không?"}]},
  {id:345, word:"cool", ipa:"/kuːl/", pos:"adjective", level:1, vi:"mát mẻ; tuyệt (cách nói thân mật)", examples:[{en:"The weather is cool today.", vi:"Hôm nay trời mát."},{en:"That's a cool idea.", vi:"Đó là một ý tưởng hay đấy."}]},
  {id:346, word:"warm", ipa:"/wɔːrm/", pos:"adjective", level:1, vi:"ấm áp", examples:[{en:"The water is warm.", vi:"Nước ấm."},{en:"Wear a warm coat.", vi:"Mặc một chiếc áo khoác ấm vào."}]},
  {id:347, word:"dark", ipa:"/dɑːrk/", pos:"adjective", level:1, vi:"tối; sẫm màu", examples:[{en:"It is dark outside.", vi:"Bên ngoài trời tối."},{en:"She has dark hair.", vi:"Cô ấy có mái tóc sẫm màu."}]},
  {id:348, word:"deep", ipa:"/diːp/", pos:"adjective", level:1, vi:"sâu", examples:[{en:"The river is very deep.", vi:"Dòng sông rất sâu."},{en:"Take a deep breath.", vi:"Hít một hơi thật sâu."}]},
  {id:349, word:"dry", ipa:"/draɪ/", pos:"adjective", level:1, vi:"khô", examples:[{en:"My clothes are dry now.", vi:"Quần áo của tôi khô rồi."},{en:"The land is very dry.", vi:"Đất rất khô."}]},
  {id:350, word:"wet", ipa:"/wet/", pos:"adjective", level:1, vi:"ướt", examples:[{en:"My shoes are wet.", vi:"Giày của tôi bị ướt."},{en:"The grass is wet.", vi:"Cỏ ướt."}]},
  {id:351, word:"famous", ipa:"/ˈfeɪməs/", pos:"adjective", level:1, vi:"nổi tiếng", examples:[{en:"He is a famous singer.", vi:"Anh ấy là một ca sĩ nổi tiếng."},{en:"This city is famous for its food.", vi:"Thành phố này nổi tiếng về ẩm thực."}]},
  {id:352, word:"fine", ipa:"/faɪn/", pos:"adjective", level:1, vi:"ổn, khỏe, tốt", examples:[{en:"I am fine, thank you.", vi:"Tôi khỏe, cảm ơn."},{en:"Everything will be fine.", vi:"Mọi chuyện sẽ ổn thôi."}]},
  {id:353, word:"funny", ipa:"/ˈfʌni/", pos:"adjective", level:1, vi:"buồn cười, hài hước", examples:[{en:"That movie is very funny.", vi:"Bộ phim đó rất hài."},{en:"He told a funny story.", vi:"Anh ấy kể một câu chuyện vui."}]},
  {id:354, word:"great", ipa:"/ɡreɪt/", pos:"adjective", level:1, vi:"tuyệt vời; vĩ đại", examples:[{en:"You did a great job!", vi:"Bạn làm rất tốt!"},{en:"We had a great time.", vi:"Chúng tôi đã có khoảng thời gian tuyệt vời."}]},
  {id:355, word:"heavy", ipa:"/ˈhevi/", pos:"adjective", level:1, vi:"nặng", examples:[{en:"This bag is too heavy.", vi:"Cái túi này nặng quá."},{en:"It was a heavy rain.", vi:"Đó là một cơn mưa lớn."}]},
  {id:356, word:"kind", ipa:"/kaɪnd/", pos:"adjective", level:1, vi:"tử tế, tốt bụng", examples:[{en:"She is very kind.", vi:"Cô ấy rất tốt bụng."},{en:"Thank you, that's very kind.", vi:"Cảm ơn, bạn thật tốt bụng."}]},
  {id:357, word:"lucky", ipa:"/ˈlʌki/", pos:"adjective", level:1, vi:"may mắn", examples:[{en:"You are so lucky!", vi:"Bạn thật may mắn!"},{en:"Seven is my lucky number.", vi:"Bảy là con số may mắn của tôi."}]},
  {id:358, word:"modern", ipa:"/ˈmɑːdərn/", pos:"adjective", level:1, vi:"hiện đại", examples:[{en:"They live in a modern house.", vi:"Họ sống trong một ngôi nhà hiện đại."},{en:"I like modern art.", vi:"Tôi thích nghệ thuật hiện đại."}]},
  {id:359, word:"near", ipa:"/nɪr/", pos:"adjective / preposition", level:1, vi:"gần", examples:[{en:"The shop is near my house.", vi:"Cửa hàng ở gần nhà tôi."},{en:"Is the station near?", vi:"Nhà ga có gần không?"}]},
  {id:360, word:"far", ipa:"/fɑːr/", pos:"adjective / adverb", level:1, vi:"xa", examples:[{en:"The airport is very far.", vi:"Sân bay rất xa."},{en:"How far is it?", vi:"Nó xa bao nhiêu?"}]},
  {id:361, word:"perfect", ipa:"/ˈpɜːrfɪkt/", pos:"adjective", level:1, vi:"hoàn hảo", examples:[{en:"This is the perfect place for a picnic.", vi:"Đây là nơi hoàn hảo để dã ngoại."},{en:"Nobody is perfect.", vi:"Không ai hoàn hảo cả."}]},
  {id:362, word:"pretty", ipa:"/ˈprɪti/", pos:"adjective / adverb", level:1, vi:"xinh, đẹp; (trạng từ) khá", examples:[{en:"She is very pretty.", vi:"Cô ấy rất xinh."},{en:"It is pretty cold today.", vi:"Hôm nay trời khá lạnh."}]},
  {id:363, word:"quiet", ipa:"/ˈkwaɪət/", pos:"adjective", level:1, vi:"yên tĩnh, im lặng", examples:[{en:"Please be quiet.", vi:"Vui lòng giữ im lặng."},{en:"It is a quiet street.", vi:"Đó là một con phố yên tĩnh."}]},
  {id:364, word:"sad", ipa:"/sæd/", pos:"adjective", level:1, vi:"buồn", examples:[{en:"Why do you look sad?", vi:"Sao trông bạn buồn vậy?"},{en:"It is a sad story.", vi:"Đó là một câu chuyện buồn."}]},
  {id:365, word:"safe", ipa:"/seɪf/", pos:"adjective", level:1, vi:"an toàn", examples:[{en:"This place is safe.", vi:"Nơi này an toàn."},{en:"Drive safely and stay safe.", vi:"Lái xe cẩn thận và giữ an toàn nhé."}]},
  {id:366, word:"about", ipa:"/əˈbaʊt/", pos:"preposition / adverb", level:1, vi:"về (chủ đề); khoảng chừng", examples:[{en:"Tell me about your day.", vi:"Kể tôi nghe về ngày của bạn."},{en:"It costs about ten dollars.", vi:"Nó giá khoảng mười đô la."}]},
  {id:367, word:"after", ipa:"/ˈæftər/", pos:"preposition", level:1, vi:"sau, sau khi", examples:[{en:"Let's meet after lunch.", vi:"Mình gặp nhau sau bữa trưa nhé."},{en:"She came after me.", vi:"Cô ấy đến sau tôi."}]},
  {id:368, word:"before", ipa:"/bɪˈfɔːr/", pos:"preposition", level:1, vi:"trước, trước khi", examples:[{en:"Wash your hands before dinner.", vi:"Rửa tay trước bữa tối."},{en:"I have seen this before.", vi:"Tôi đã thấy cái này trước đây."}]},
  {id:369, word:"around", ipa:"/əˈraʊnd/", pos:"preposition / adverb", level:1, vi:"quanh, xung quanh; khoảng", examples:[{en:"We walked around the lake.", vi:"Chúng tôi đi dạo quanh hồ."},{en:"She will arrive around noon.", vi:"Cô ấy sẽ đến khoảng trưa."}]},
  {id:370, word:"away", ipa:"/əˈweɪ/", pos:"adverb", level:1, vi:"đi xa, ra xa", examples:[{en:"Go away, please.", vi:"Đi chỗ khác đi."},{en:"The school is two miles away.", vi:"Trường học cách đây hai dặm."}]},
  {id:371, word:"back", ipa:"/bæk/", pos:"adverb", level:1, vi:"trở lại, về lại", examples:[{en:"I will be back soon.", vi:"Tôi sẽ quay lại sớm."},{en:"Give it back to me.", vi:"Trả nó lại cho tôi."}]},
  {id:372, word:"down", ipa:"/daʊn/", pos:"adverb / preposition", level:1, vi:"xuống, ở dưới", examples:[{en:"Sit down, please.", vi:"Mời ngồi xuống."},{en:"The price went down.", vi:"Giá đã giảm xuống."}]},
  {id:373, word:"up", ipa:"/ʌp/", pos:"adverb / preposition", level:1, vi:"lên, ở trên", examples:[{en:"Stand up, please.", vi:"Vui lòng đứng lên."},{en:"Prices are going up.", vi:"Giá cả đang tăng lên."}]},
  {id:374, word:"out", ipa:"/aʊt/", pos:"adverb", level:1, vi:"ra ngoài", examples:[{en:"Let's go out tonight.", vi:"Tối nay mình ra ngoài nhé."},{en:"He went out an hour ago.", vi:"Anh ấy ra ngoài một tiếng trước."}]},
  {id:375, word:"soon", ipa:"/suːn/", pos:"adverb", level:1, vi:"sớm, chẳng bao lâu nữa", examples:[{en:"See you soon!", vi:"Hẹn sớm gặp lại!"},{en:"The bus will come soon.", vi:"Xe buýt sắp đến rồi."}]},
  {id:376, word:"then", ipa:"/ðen/", pos:"adverb", level:1, vi:"sau đó, rồi; khi đó", examples:[{en:"We ate, then we left.", vi:"Chúng tôi ăn, rồi rời đi."},{en:"See you then.", vi:"Hẹn gặp lúc đó nhé."}]},
  {id:377, word:"too", ipa:"/tuː/", pos:"adverb", level:1, vi:"cũng; quá (mức)", examples:[{en:"I want to come too.", vi:"Tôi cũng muốn đến."},{en:"It is too hot today.", vi:"Hôm nay nóng quá."}]},
  {id:378, word:"well", ipa:"/wel/", pos:"adverb", level:1, vi:"tốt, giỏi; khỏe", examples:[{en:"She sings well.", vi:"Cô ấy hát hay."},{en:"I don't feel well.", vi:"Tôi thấy không khỏe."}]},
  {id:379, word:"almost", ipa:"/ˈɔːlmoʊst/", pos:"adverb", level:1, vi:"gần như, suýt", examples:[{en:"We are almost there.", vi:"Chúng ta gần đến nơi rồi."},{en:"I almost forgot!", vi:"Tôi suýt quên mất!"}]},
  {id:380, word:"enough", ipa:"/ɪˈnʌf/", pos:"adverb / adjective", level:1, vi:"đủ", examples:[{en:"That's enough, thank you.", vi:"Đủ rồi, cảm ơn."},{en:"We have enough food.", vi:"Chúng ta có đủ thức ăn."}]},
  {id:381, word:"even", ipa:"/ˈiːvn/", pos:"adverb", level:1, vi:"ngay cả, thậm chí", examples:[{en:"Even a child can do it.", vi:"Ngay cả một đứa trẻ cũng làm được."},{en:"She didn't even say hello.", vi:"Cô ấy thậm chí không chào."}]},
  {id:382, word:"ever", ipa:"/ˈevər/", pos:"adverb", level:1, vi:"từng, bao giờ", examples:[{en:"Have you ever been to Hanoi?", vi:"Bạn đã bao giờ đến Hà Nội chưa?"},{en:"It is the best meal ever.", vi:"Đó là bữa ăn ngon nhất từ trước đến nay."}]},
  {id:383, word:"just", ipa:"/dʒʌst/", pos:"adverb", level:1, vi:"vừa mới; chỉ", examples:[{en:"I just arrived.", vi:"Tôi vừa đến."},{en:"It is just a small problem.", vi:"Đó chỉ là một vấn đề nhỏ."}]},
  {id:384, word:"less", ipa:"/les/", pos:"adverb / adjective", level:1, vi:"ít hơn", examples:[{en:"I want to spend less money.", vi:"Tôi muốn tiêu ít tiền hơn."},{en:"Try to eat less sugar.", vi:"Cố ăn ít đường hơn nhé."}]},
  {id:385, word:"much", ipa:"/mʌtʃ/", pos:"adverb / adjective", level:1, vi:"nhiều", examples:[{en:"Thank you very much.", vi:"Cảm ơn bạn rất nhiều."},{en:"I don't have much time.", vi:"Tôi không có nhiều thời gian."}]},
  {id:386, word:"often", ipa:"/ˈɔːfn/", pos:"adverb", level:1, vi:"thường, thường xuyên", examples:[{en:"I often walk in the park.", vi:"Tôi thường đi dạo trong công viên."},{en:"How often do you exercise?", vi:"Bạn có hay tập thể dục không?"}]},
  {id:387, word:"perhaps", ipa:"/pərˈhæps/", pos:"adverb", level:1, vi:"có lẽ", examples:[{en:"Perhaps she is busy.", vi:"Có lẽ cô ấy bận."},{en:"Perhaps we can meet tomorrow.", vi:"Có lẽ ngày mai mình gặp được."}]},
  {id:388, word:"quite", ipa:"/kwaɪt/", pos:"adverb", level:1, vi:"khá; hoàn toàn", examples:[{en:"It is quite cold today.", vi:"Hôm nay khá lạnh."},{en:"She is quite tall.", vi:"Cô ấy khá cao."}]},
  {id:389, word:"sometimes", ipa:"/ˈsʌmtaɪmz/", pos:"adverb", level:1, vi:"thỉnh thoảng, đôi khi", examples:[{en:"Sometimes I cook at home.", vi:"Thỉnh thoảng tôi nấu ăn ở nhà."},{en:"He is sometimes late.", vi:"Anh ấy đôi khi đến muộn."}]},
  {id:390, word:"yet", ipa:"/jet/", pos:"adverb", level:1, vi:"chưa (trong câu hỏi/phủ định)", examples:[{en:"I haven't finished yet.", vi:"Tôi vẫn chưa xong."},{en:"Are you ready yet?", vi:"Bạn xong chưa?"}]},
  {id:391, word:"already", ipa:"/ɔːlˈredi/", pos:"adverb", level:1, vi:"đã, rồi (sớm hơn dự kiến)", examples:[{en:"I have already eaten.", vi:"Tôi đã ăn rồi."},{en:"She is already here.", vi:"Cô ấy đã ở đây rồi."}]},
  {id:392, word:"tonight", ipa:"/təˈnaɪt/", pos:"adverb / noun", level:1, vi:"tối nay", examples:[{en:"Let's go out tonight.", vi:"Tối nay mình đi chơi nhé."},{en:"I will call you tonight.", vi:"Tối nay tôi sẽ gọi bạn."}]},
  {id:393, word:"tomorrow", ipa:"/təˈmɔːroʊ/", pos:"adverb / noun", level:1, vi:"ngày mai", examples:[{en:"See you tomorrow.", vi:"Hẹn gặp ngày mai."},{en:"Tomorrow is Sunday.", vi:"Ngày mai là Chủ nhật."}]},
  {id:394, word:"yesterday", ipa:"/ˈjestərdeɪ/", pos:"adverb / noun", level:1, vi:"hôm qua", examples:[{en:"I saw her yesterday.", vi:"Tôi gặp cô ấy hôm qua."},{en:"Yesterday was very hot.", vi:"Hôm qua trời rất nóng."}]},
  {id:395, word:"ago", ipa:"/əˈɡoʊ/", pos:"adverb", level:1, vi:"cách đây, về trước", examples:[{en:"She left an hour ago.", vi:"Cô ấy rời đi cách đây một tiếng."},{en:"We met two years ago.", vi:"Chúng tôi gặp nhau hai năm trước."}]},
  {id:396, word:"instead", ipa:"/ɪnˈsted/", pos:"adverb", level:1, vi:"thay vào đó", examples:[{en:"Let's stay home instead.", vi:"Thay vào đó, mình ở nhà nhé."},{en:"I drank tea instead of coffee.", vi:"Tôi uống trà thay vì cà phê."}]},
  {id:397, word:"anywhere", ipa:"/ˈeniwer/", pos:"adverb", level:1, vi:"bất cứ đâu; (phủ định) đâu cả", examples:[{en:"You can sit anywhere.", vi:"Bạn ngồi đâu cũng được."},{en:"I can't find it anywhere.", vi:"Tôi tìm khắp nơi mà không thấy."}]},
  {id:398, word:"everywhere", ipa:"/ˈevriwer/", pos:"adverb", level:1, vi:"khắp nơi", examples:[{en:"I looked everywhere for my keys.", vi:"Tôi tìm chìa khóa khắp nơi."},{en:"There are people everywhere.", vi:"Đâu đâu cũng có người."}]},
  {id:399, word:"somewhere", ipa:"/ˈsʌmwer/", pos:"adverb", level:1, vi:"đâu đó, nơi nào đó", examples:[{en:"Let's go somewhere quiet.", vi:"Mình đến chỗ nào yên tĩnh đi."},{en:"I left my phone somewhere.", vi:"Tôi để quên điện thoại đâu đó rồi."}]},
  {id:400, word:"however", ipa:"/haʊˈevər/", pos:"adverb", level:1, vi:"tuy nhiên, tuy vậy", examples:[{en:"It was raining; however, we went out.", vi:"Trời mưa; tuy nhiên, chúng tôi vẫn ra ngoài."},{en:"It is expensive. However, it is very good.", vi:"Nó đắt. Tuy nhiên, nó rất tốt."}]}
  // ===== LÔ 4: 200 từ Level 1 tiếp theo (id 401-600) =====
  // Dán toàn bộ khối này vào sau từ id:400 "however" trong mảng WORDS (trước dấu ]).
  // Khối đã có sẵn dấu phẩy đứng đầu nên nối liền, không cần sửa gì thêm.
  ,{id:401, word:"accept", ipa:"/əkˈsept/", pos:"verb", level:1, vi:"chấp nhận, nhận", examples:[{en:"Please accept my apology.", vi:"Xin hãy nhận lời xin lỗi của tôi."},{en:"She accepted the job.", vi:"Cô ấy đã nhận công việc."}]},
  {id:402, word:"agree", ipa:"/əˈɡriː/", pos:"verb", level:1, vi:"đồng ý", examples:[{en:"I agree with you.", vi:"Tôi đồng ý với bạn."},{en:"We didn't agree on the price.", vi:"Chúng tôi không thống nhất được về giá."}]},
  {id:403, word:"allow", ipa:"/əˈlaʊ/", pos:"verb", level:1, vi:"cho phép", examples:[{en:"Smoking is not allowed here.", vi:"Không được hút thuốc ở đây."},{en:"My parents allow me to go out.", vi:"Bố mẹ cho phép tôi ra ngoài."}]},
  {id:404, word:"appear", ipa:"/əˈpɪr/", pos:"verb", level:1, vi:"xuất hiện; có vẻ", examples:[{en:"A rainbow appeared in the sky.", vi:"Một cầu vồng xuất hiện trên trời."},{en:"She appears happy.", vi:"Cô ấy có vẻ vui."}]},
  {id:405, word:"arrive", ipa:"/əˈraɪv/", pos:"verb", level:1, vi:"đến nơi", examples:[{en:"The train arrives at noon.", vi:"Tàu đến lúc trưa."},{en:"We arrived early.", vi:"Chúng tôi đến sớm."}]},
  {id:406, word:"beat", ipa:"/biːt/", pos:"verb", level:1, vi:"đánh; đánh bại; (tim) đập", examples:[{en:"Our team beat them.", vi:"Đội của chúng tôi đã đánh bại họ."},{en:"My heart is beating fast.", vi:"Tim tôi đập nhanh."}]},
  {id:407, word:"borrow", ipa:"/ˈbɑːroʊ/", pos:"verb", level:1, vi:"mượn", examples:[{en:"Can I borrow your pen?", vi:"Tôi mượn bút của bạn được không?"},{en:"He borrowed some money.", vi:"Anh ấy mượn một ít tiền."}]},
  {id:408, word:"burn", ipa:"/bɜːrn/", pos:"verb", level:1, vi:"đốt, cháy; làm bỏng", examples:[{en:"The fire burned all night.", vi:"Ngọn lửa cháy suốt đêm."},{en:"Be careful not to burn the rice.", vi:"Cẩn thận đừng làm cháy cơm."}]},
  {id:409, word:"check", ipa:"/tʃek/", pos:"verb", level:1, vi:"kiểm tra, xem lại", examples:[{en:"Check your email.", vi:"Kiểm tra email của bạn đi."},{en:"Let me check the time.", vi:"Để tôi xem giờ."}]},
  {id:410, word:"climb", ipa:"/klaɪm/", pos:"verb", level:1, vi:"leo, trèo", examples:[{en:"We climbed the mountain.", vi:"Chúng tôi leo núi."},{en:"The cat climbed the tree.", vi:"Con mèo trèo lên cây."}]},
  {id:411, word:"collect", ipa:"/kəˈlekt/", pos:"verb", level:1, vi:"thu thập, sưu tầm", examples:[{en:"She collects stamps.", vi:"Cô ấy sưu tầm tem."},{en:"Please collect your things.", vi:"Vui lòng thu dọn đồ của bạn."}]},
  {id:412, word:"complete", ipa:"/kəmˈpliːt/", pos:"verb", level:1, vi:"hoàn thành, làm xong", examples:[{en:"I completed the task.", vi:"Tôi đã hoàn thành nhiệm vụ."},{en:"Complete the form, please.", vi:"Vui lòng điền xong mẫu đơn."}]},
  {id:413, word:"connect", ipa:"/kəˈnekt/", pos:"verb", level:1, vi:"kết nối, nối", examples:[{en:"Connect the phone to the charger.", vi:"Kết nối điện thoại với sạc."},{en:"The bridge connects two cities.", vi:"Cây cầu nối hai thành phố."}]},
  {id:414, word:"consider", ipa:"/kənˈsɪdər/", pos:"verb", level:1, vi:"cân nhắc, xem xét", examples:[{en:"Please consider my idea.", vi:"Vui lòng cân nhắc ý kiến của tôi."},{en:"We are considering a trip.", vi:"Chúng tôi đang tính một chuyến đi."}]},
  {id:415, word:"continue", ipa:"/kənˈtɪnjuː/", pos:"verb", level:1, vi:"tiếp tục", examples:[{en:"Please continue.", vi:"Mời tiếp tục."},{en:"The rain continued all day.", vi:"Mưa tiếp tục suốt cả ngày."}]},
  {id:416, word:"cook", ipa:"/kʊk/", pos:"verb", level:1, vi:"nấu ăn", examples:[{en:"My father cooks dinner.", vi:"Bố tôi nấu bữa tối."},{en:"I am learning to cook.", vi:"Tôi đang học nấu ăn."}]},
  {id:417, word:"cost", ipa:"/kɔːst/", pos:"verb", level:1, vi:"có giá, tốn (tiền)", examples:[{en:"How much does it cost?", vi:"Cái này giá bao nhiêu?"},{en:"The ticket costs five dollars.", vi:"Vé giá năm đô la."}]},
  {id:418, word:"cry", ipa:"/kraɪ/", pos:"verb", level:1, vi:"khóc", examples:[{en:"The baby is crying.", vi:"Em bé đang khóc."},{en:"Don't cry, everything is fine.", vi:"Đừng khóc, mọi chuyện ổn rồi."}]},
  {id:419, word:"dance", ipa:"/dæns/", pos:"verb", level:1, vi:"nhảy, khiêu vũ", examples:[{en:"They danced all night.", vi:"Họ nhảy suốt đêm."},{en:"Can you dance?", vi:"Bạn biết nhảy không?"}]},
  {id:420, word:"die", ipa:"/daɪ/", pos:"verb", level:1, vi:"chết, qua đời", examples:[{en:"The flowers died without water.", vi:"Hoa chết vì thiếu nước."},{en:"His grandfather died last year.", vi:"Ông của anh ấy mất năm ngoái."}]},
  {id:421, word:"dream", ipa:"/driːm/", pos:"verb", level:1, vi:"mơ; mơ ước", examples:[{en:"I dreamed about you.", vi:"Tôi đã mơ về bạn."},{en:"She dreams of being a doctor.", vi:"Cô ấy mơ ước trở thành bác sĩ."}]},
  {id:422, word:"end", ipa:"/end/", pos:"verb", level:1, vi:"kết thúc", examples:[{en:"The movie ends at ten.", vi:"Bộ phim kết thúc lúc mười giờ."},{en:"How does the story end?", vi:"Câu chuyện kết thúc thế nào?"}]},
  {id:423, word:"enter", ipa:"/ˈentər/", pos:"verb", level:1, vi:"đi vào, bước vào", examples:[{en:"Please enter the room quietly.", vi:"Vui lòng vào phòng nhẹ nhàng."},{en:"She entered the building.", vi:"Cô ấy bước vào tòa nhà."}]},
  {id:424, word:"expect", ipa:"/ɪkˈspekt/", pos:"verb", level:1, vi:"mong đợi, trông đợi", examples:[{en:"I expect good news.", vi:"Tôi mong tin tốt."},{en:"We expect ten guests.", vi:"Chúng tôi đợi mười vị khách."}]},
  {id:425, word:"fail", ipa:"/feɪl/", pos:"verb", level:1, vi:"thất bại; trượt (kỳ thi)", examples:[{en:"Don't be afraid to fail.", vi:"Đừng sợ thất bại."},{en:"He failed the test.", vi:"Anh ấy trượt bài kiểm tra."}]},
  {id:426, word:"feed", ipa:"/fiːd/", pos:"verb", level:1, vi:"cho ăn, nuôi", examples:[{en:"I feed my dog twice a day.", vi:"Tôi cho chó ăn hai lần mỗi ngày."},{en:"She feeds the birds.", vi:"Cô ấy cho chim ăn."}]},
  {id:427, word:"fight", ipa:"/faɪt/", pos:"verb", level:1, vi:"đánh nhau; chiến đấu; cãi nhau", examples:[{en:"Don't fight with your brother.", vi:"Đừng đánh nhau với em trai."},{en:"They fight for their freedom.", vi:"Họ chiến đấu vì tự do."}]},
  {id:428, word:"fit", ipa:"/fɪt/", pos:"verb", level:1, vi:"vừa (kích cỡ); phù hợp", examples:[{en:"These shoes fit me well.", vi:"Đôi giày này vừa chân tôi."},{en:"The box doesn't fit in the bag.", vi:"Cái hộp không vừa cái túi."}]},
  {id:429, word:"guess", ipa:"/ɡes/", pos:"verb", level:1, vi:"đoán", examples:[{en:"Guess what happened!", vi:"Đoán xem chuyện gì đã xảy ra!"},{en:"I can't guess the answer.", vi:"Tôi không đoán được câu trả lời."}]},
  {id:430, word:"hang", ipa:"/hæŋ/", pos:"verb", level:1, vi:"treo", examples:[{en:"Hang your coat here.", vi:"Treo áo khoác của bạn ở đây."},{en:"She hung the picture on the wall.", vi:"Cô ấy treo bức tranh lên tường."}]},
  {id:431, word:"hit", ipa:"/hɪt/", pos:"verb", level:1, vi:"đánh, đập, va vào", examples:[{en:"Don't hit the table.", vi:"Đừng đập vào bàn."},{en:"The ball hit the window.", vi:"Quả bóng va vào cửa sổ."}]},
  {id:432, word:"hurry", ipa:"/ˈhɜːri/", pos:"verb", level:1, vi:"vội, gấp, nhanh lên", examples:[{en:"Hurry up, we are late!", vi:"Nhanh lên, mình muộn rồi!"},{en:"There's no need to hurry.", vi:"Không cần phải vội."}]},
  {id:433, word:"imagine", ipa:"/ɪˈmædʒɪn/", pos:"verb", level:1, vi:"tưởng tượng", examples:[{en:"Imagine a quiet beach.", vi:"Hãy tưởng tượng một bãi biển yên tĩnh."},{en:"I can't imagine life without music.", vi:"Tôi không thể tưởng tượng cuộc sống thiếu âm nhạc."}]},
  {id:434, word:"improve", ipa:"/ɪmˈpruːv/", pos:"verb", level:1, vi:"cải thiện, tiến bộ", examples:[{en:"I want to improve my English.", vi:"Tôi muốn cải thiện tiếng Anh."},{en:"Her health is improving.", vi:"Sức khỏe của cô ấy đang tốt lên."}]},
  {id:435, word:"include", ipa:"/ɪnˈkluːd/", pos:"verb", level:1, vi:"bao gồm", examples:[{en:"The price includes breakfast.", vi:"Giá đã bao gồm bữa sáng."},{en:"The team includes five people.", vi:"Đội gồm năm người."}]},
  {id:436, word:"increase", ipa:"/ɪnˈkriːs/", pos:"verb", level:1, vi:"tăng, tăng lên", examples:[{en:"Prices increased this year.", vi:"Giá tăng trong năm nay."},{en:"We need to increase sales.", vi:"Chúng ta cần tăng doanh số."}]},
  {id:437, word:"introduce", ipa:"/ˌɪntrəˈduːs/", pos:"verb", level:1, vi:"giới thiệu", examples:[{en:"Let me introduce my friend.", vi:"Để tôi giới thiệu bạn tôi."},{en:"She introduced herself.", vi:"Cô ấy tự giới thiệu."}]},
  {id:438, word:"invite", ipa:"/ɪnˈvaɪt/", pos:"verb", level:1, vi:"mời", examples:[{en:"They invited us to dinner.", vi:"Họ mời chúng tôi ăn tối."},{en:"I want to invite you to my party.", vi:"Tôi muốn mời bạn đến bữa tiệc của tôi."}]},
  {id:439, word:"knock", ipa:"/nɑːk/", pos:"verb", level:1, vi:"gõ (cửa)", examples:[{en:"Please knock before you enter.", vi:"Vui lòng gõ cửa trước khi vào."},{en:"Someone is knocking at the door.", vi:"Có người đang gõ cửa."}]},
  {id:440, word:"lead", ipa:"/liːd/", pos:"verb", level:1, vi:"dẫn dắt, dẫn đường", examples:[{en:"She leads the team.", vi:"Cô ấy dẫn dắt cả đội."},{en:"This road leads to the beach.", vi:"Con đường này dẫn ra bãi biển."}]},
  {id:441, word:"matter", ipa:"/ˈmætər/", pos:"verb", level:1, vi:"quan trọng, có ý nghĩa", examples:[{en:"It doesn't matter.", vi:"Không sao đâu."},{en:"Your health matters most.", vi:"Sức khỏe của bạn quan trọng nhất."}]},
  {id:442, word:"mix", ipa:"/mɪks/", pos:"verb", level:1, vi:"trộn, pha", examples:[{en:"Mix the eggs and flour.", vi:"Trộn trứng với bột."},{en:"Don't mix the colors.", vi:"Đừng trộn các màu."}]},
  {id:443, word:"order", ipa:"/ˈɔːrdər/", pos:"verb", level:1, vi:"gọi món, đặt hàng; ra lệnh", examples:[{en:"Let's order some food.", vi:"Mình gọi đồ ăn nhé."},{en:"She ordered a coffee.", vi:"Cô ấy gọi một ly cà phê."}]},
  {id:444, word:"own", ipa:"/oʊn/", pos:"verb", level:1, vi:"sở hữu, có", examples:[{en:"They own a small shop.", vi:"Họ sở hữu một cửa hàng nhỏ."},{en:"I own three bikes.", vi:"Tôi có ba chiếc xe đạp."}]},
  {id:445, word:"pick", ipa:"/pɪk/", pos:"verb", level:1, vi:"chọn; hái; nhặt lên", examples:[{en:"Pick a card.", vi:"Chọn một lá bài đi."},{en:"She picked some flowers.", vi:"Cô ấy hái vài bông hoa."}]},
  {id:446, word:"plant", ipa:"/plænt/", pos:"verb", level:1, vi:"trồng (cây)", examples:[{en:"We plant trees every spring.", vi:"Chúng tôi trồng cây mỗi mùa xuân."},{en:"She planted some flowers.", vi:"Cô ấy trồng vài bông hoa."}]},
  {id:447, word:"pour", ipa:"/pɔːr/", pos:"verb", level:1, vi:"rót, đổ", examples:[{en:"Pour me some water, please.", vi:"Rót cho tôi chút nước nhé."},{en:"She poured the tea.", vi:"Cô ấy rót trà."}]},
  {id:448, word:"practice", ipa:"/ˈpræktɪs/", pos:"verb", level:1, vi:"luyện tập, thực hành", examples:[{en:"I practice English every day.", vi:"Tôi luyện tiếng Anh mỗi ngày."},{en:"Practice makes perfect.", vi:"Có công mài sắt có ngày nên kim."}]},
  {id:449, word:"press", ipa:"/pres/", pos:"verb", level:1, vi:"nhấn, ấn; ép", examples:[{en:"Press this button.", vi:"Nhấn nút này."},{en:"Press the door bell.", vi:"Bấm chuông cửa đi."}]},
  {id:450, word:"print", ipa:"/prɪnt/", pos:"verb", level:1, vi:"in", examples:[{en:"Please print this page.", vi:"Vui lòng in trang này."},{en:"I printed the tickets.", vi:"Tôi đã in vé."}]},
  {id:451, word:"produce", ipa:"/prəˈduːs/", pos:"verb", level:1, vi:"sản xuất, tạo ra", examples:[{en:"This factory produces cars.", vi:"Nhà máy này sản xuất ô tô."},{en:"Bees produce honey.", vi:"Ong tạo ra mật."}]},
  {id:452, word:"promise", ipa:"/ˈprɑːmɪs/", pos:"verb", level:1, vi:"hứa", examples:[{en:"I promise to help you.", vi:"Tôi hứa sẽ giúp bạn."},{en:"She promised to come.", vi:"Cô ấy hứa sẽ đến."}]},
  {id:453, word:"protect", ipa:"/prəˈtekt/", pos:"verb", level:1, vi:"bảo vệ", examples:[{en:"We must protect nature.", vi:"Chúng ta phải bảo vệ thiên nhiên."},{en:"A hat protects you from the sun.", vi:"Cái mũ bảo vệ bạn khỏi nắng."}]},
  {id:454, word:"prove", ipa:"/pruːv/", pos:"verb", level:1, vi:"chứng minh, chứng tỏ", examples:[{en:"Can you prove it?", vi:"Bạn chứng minh được không?"},{en:"She proved that she was right.", vi:"Cô ấy đã chứng minh mình đúng."}]},
  {id:455, word:"realize", ipa:"/ˈriːəlaɪz/", pos:"verb", level:1, vi:"nhận ra", examples:[{en:"I didn't realize it was so late.", vi:"Tôi không nhận ra đã muộn thế."},{en:"She realized her mistake.", vi:"Cô ấy nhận ra lỗi của mình."}]},
  {id:456, word:"apple", ipa:"/ˈæpl/", pos:"noun", level:1, vi:"quả táo", examples:[{en:"I eat an apple every day.", vi:"Tôi ăn một quả táo mỗi ngày."},{en:"The apple is red and sweet.", vi:"Quả táo đỏ và ngọt."}]},
  {id:457, word:"area", ipa:"/ˈeriə/", pos:"noun", level:1, vi:"khu vực, vùng; diện tích", examples:[{en:"This is a quiet area.", vi:"Đây là một khu vực yên tĩnh."},{en:"There are many shops in this area.", vi:"Có nhiều cửa hàng trong khu vực này."}]},
  {id:458, word:"autumn", ipa:"/ˈɔːtəm/", pos:"noun", level:1, vi:"mùa thu", examples:[{en:"The leaves fall in autumn.", vi:"Lá rụng vào mùa thu."},{en:"Autumn is my favorite season.", vi:"Mùa thu là mùa tôi thích nhất."}]},
  {id:459, word:"bag", ipa:"/bæɡ/", pos:"noun", level:1, vi:"cái túi, cặp", examples:[{en:"My bag is heavy.", vi:"Cái túi của tôi nặng."},{en:"She put the book in her bag.", vi:"Cô ấy bỏ quyển sách vào túi."}]},
  {id:460, word:"bath", ipa:"/bæθ/", pos:"noun", level:1, vi:"sự tắm; bồn tắm", examples:[{en:"I take a bath every evening.", vi:"Tôi tắm mỗi tối."},{en:"The baby is having a bath.", vi:"Em bé đang được tắm."}]},
  {id:461, word:"bell", ipa:"/bel/", pos:"noun", level:1, vi:"cái chuông", examples:[{en:"The school bell rang.", vi:"Chuông trường reo."},{en:"Ring the bell, please.", vi:"Vui lòng rung chuông."}]},
  {id:462, word:"bicycle", ipa:"/ˈbaɪsɪkl/", pos:"noun", level:1, vi:"xe đạp", examples:[{en:"I ride my bicycle to school.", vi:"Tôi đạp xe đến trường."},{en:"Her bicycle is new.", vi:"Xe đạp của cô ấy mới."}]},
  {id:463, word:"bill", ipa:"/bɪl/", pos:"noun", level:1, vi:"hóa đơn", examples:[{en:"Can I have the bill, please?", vi:"Cho tôi xin hóa đơn nhé?"},{en:"The electricity bill is high.", vi:"Hóa đơn tiền điện cao."}]},
  {id:464, word:"board", ipa:"/bɔːrd/", pos:"noun", level:1, vi:"bảng; tấm ván", examples:[{en:"The teacher writes on the board.", vi:"Giáo viên viết lên bảng."},{en:"Look at the board, please.", vi:"Vui lòng nhìn lên bảng."}]},
  {id:465, word:"bone", ipa:"/boʊn/", pos:"noun", level:1, vi:"xương", examples:[{en:"The dog is eating a bone.", vi:"Con chó đang gặm xương."},{en:"He broke a bone in his arm.", vi:"Anh ấy bị gãy xương tay."}]},
  {id:466, word:"bottle", ipa:"/ˈbɑːtl/", pos:"noun", level:1, vi:"cái chai", examples:[{en:"A bottle of water, please.", vi:"Cho tôi một chai nước."},{en:"The bottle is empty.", vi:"Cái chai rỗng."}]},
  {id:467, word:"box", ipa:"/bɑːks/", pos:"noun", level:1, vi:"cái hộp", examples:[{en:"What is in the box?", vi:"Có gì trong hộp vậy?"},{en:"Put the toys in the box.", vi:"Bỏ đồ chơi vào hộp."}]},
  {id:468, word:"breakfast", ipa:"/ˈbrekfəst/", pos:"noun", level:1, vi:"bữa sáng", examples:[{en:"I eat breakfast at seven.", vi:"Tôi ăn sáng lúc bảy giờ."},{en:"Breakfast is ready.", vi:"Bữa sáng đã sẵn sàng."}]},
  {id:469, word:"bridge", ipa:"/brɪdʒ/", pos:"noun", level:1, vi:"cây cầu", examples:[{en:"We crossed the bridge.", vi:"Chúng tôi qua cây cầu."},{en:"The bridge is very long.", vi:"Cây cầu rất dài."}]},
  {id:470, word:"brush", ipa:"/brʌʃ/", pos:"noun", level:1, vi:"bàn chải; cây cọ", examples:[{en:"Where is my hair brush?", vi:"Cái lược của tôi đâu?"},{en:"She painted with a brush.", vi:"Cô ấy vẽ bằng cọ."}]},
  {id:471, word:"button", ipa:"/ˈbʌtn/", pos:"noun", level:1, vi:"cái nút; cúc áo", examples:[{en:"Press the green button.", vi:"Nhấn nút màu xanh."},{en:"A button on my shirt is missing.", vi:"Áo tôi bị mất một cúc."}]},
  {id:472, word:"care", ipa:"/ker/", pos:"noun", level:1, vi:"sự chăm sóc; sự cẩn thận", examples:[{en:"Take care of yourself.", vi:"Hãy chăm sóc bản thân nhé."},{en:"Handle it with care.", vi:"Hãy cầm nó cẩn thận."}]},
  {id:473, word:"case", ipa:"/keɪs/", pos:"noun", level:1, vi:"trường hợp; vụ việc; hộp đựng", examples:[{en:"In that case, I agree.", vi:"Trong trường hợp đó, tôi đồng ý."},{en:"Take an umbrella in case it rains.", vi:"Mang ô phòng khi trời mưa."}]},
  {id:474, word:"ceiling", ipa:"/ˈsiːlɪŋ/", pos:"noun", level:1, vi:"trần nhà", examples:[{en:"There is a light on the ceiling.", vi:"Có một bóng đèn trên trần nhà."},{en:"The ceiling is very high.", vi:"Trần nhà rất cao."}]},
  {id:475, word:"chance", ipa:"/tʃæns/", pos:"noun", level:1, vi:"cơ hội; khả năng", examples:[{en:"Give me a chance.", vi:"Cho tôi một cơ hội."},{en:"There is a small chance of rain.", vi:"Có một chút khả năng mưa."}]},
  {id:476, word:"cheese", ipa:"/tʃiːz/", pos:"noun", level:1, vi:"phô mai", examples:[{en:"I like cheese on my bread.", vi:"Tôi thích phô mai trên bánh mì."},{en:"This cheese smells strong.", vi:"Phô mai này có mùi nồng."}]},
  {id:477, word:"chicken", ipa:"/ˈtʃɪkɪn/", pos:"noun", level:1, vi:"con gà; thịt gà", examples:[{en:"We had chicken for dinner.", vi:"Chúng tôi ăn thịt gà vào bữa tối."},{en:"The chicken is in the yard.", vi:"Con gà ở trong sân."}]},
  {id:478, word:"choice", ipa:"/tʃɔɪs/", pos:"noun", level:1, vi:"sự lựa chọn", examples:[{en:"It is your choice.", vi:"Đó là lựa chọn của bạn."},{en:"We have no choice.", vi:"Chúng ta không có lựa chọn nào."}]},
  {id:479, word:"church", ipa:"/tʃɜːrtʃ/", pos:"noun", level:1, vi:"nhà thờ", examples:[{en:"They go to church on Sundays.", vi:"Họ đi nhà thờ vào Chủ nhật."},{en:"The old church is beautiful.", vi:"Nhà thờ cổ rất đẹp."}]},
  {id:480, word:"circle", ipa:"/ˈsɜːrkl/", pos:"noun", level:1, vi:"vòng tròn, hình tròn", examples:[{en:"Draw a circle.", vi:"Vẽ một vòng tròn."},{en:"We sat in a circle.", vi:"Chúng tôi ngồi thành vòng tròn."}]},
  {id:481, word:"college", ipa:"/ˈkɑːlɪdʒ/", pos:"noun", level:1, vi:"trường cao đẳng, đại học", examples:[{en:"My brother is in college.", vi:"Anh trai tôi đang học đại học."},{en:"She teaches at a college.", vi:"Cô ấy dạy ở một trường cao đẳng."}]},
  {id:482, word:"company", ipa:"/ˈkʌmpəni/", pos:"noun", level:1, vi:"công ty; sự bầu bạn", examples:[{en:"She works for a big company.", vi:"Cô ấy làm cho một công ty lớn."},{en:"Thank you for your company.", vi:"Cảm ơn vì đã bầu bạn."}]},
  {id:483, word:"cotton", ipa:"/ˈkɑːtn/", pos:"noun", level:1, vi:"vải bông, sợi bông", examples:[{en:"This shirt is made of cotton.", vi:"Cái áo này làm từ vải bông."},{en:"Cotton is soft and light.", vi:"Vải bông mềm và nhẹ."}]},
  {id:484, word:"cow", ipa:"/kaʊ/", pos:"noun", level:1, vi:"con bò", examples:[{en:"The cow gives milk.", vi:"Con bò cho sữa."},{en:"There are cows on the farm.", vi:"Có những con bò trong nông trại."}]},
  {id:485, word:"crowd", ipa:"/kraʊd/", pos:"noun", level:1, vi:"đám đông", examples:[{en:"A large crowd gathered.", vi:"Một đám đông lớn tụ tập."},{en:"I lost him in the crowd.", vi:"Tôi lạc mất anh ấy trong đám đông."}]},
  {id:486, word:"culture", ipa:"/ˈkʌltʃər/", pos:"noun", level:1, vi:"văn hóa", examples:[{en:"I love Vietnamese culture.", vi:"Tôi yêu văn hóa Việt Nam."},{en:"Food is part of culture.", vi:"Ẩm thực là một phần của văn hóa."}]},
  {id:487, word:"customer", ipa:"/ˈkʌstəmər/", pos:"noun", level:1, vi:"khách hàng", examples:[{en:"The customer is always right.", vi:"Khách hàng luôn đúng."},{en:"We have many customers today.", vi:"Hôm nay chúng tôi có nhiều khách."}]},
  {id:488, word:"dad", ipa:"/dæd/", pos:"noun", level:1, vi:"bố (cách gọi thân mật)", examples:[{en:"My dad is at work.", vi:"Bố tôi đang ở chỗ làm."},{en:"Thanks, Dad!", vi:"Cảm ơn bố!"}]},
  {id:489, word:"danger", ipa:"/ˈdeɪndʒər/", pos:"noun", level:1, vi:"sự nguy hiểm, mối nguy", examples:[{en:"There is no danger here.", vi:"Ở đây không có nguy hiểm gì."},{en:"The sign warns of danger.", vi:"Tấm biển cảnh báo nguy hiểm."}]},
  {id:490, word:"daughter", ipa:"/ˈdɔːtər/", pos:"noun", level:1, vi:"con gái (của ai đó)", examples:[{en:"Their daughter is five.", vi:"Con gái họ năm tuổi."},{en:"She has one daughter.", vi:"Cô ấy có một cô con gái."}]},
  {id:491, word:"son", ipa:"/sʌn/", pos:"noun", level:1, vi:"con trai (của ai đó)", examples:[{en:"Their son is in school.", vi:"Con trai họ đang đi học."},{en:"He is a good son.", vi:"Cậu ấy là một người con ngoan."}]},
  {id:492, word:"decision", ipa:"/dɪˈsɪʒn/", pos:"noun", level:1, vi:"quyết định", examples:[{en:"It is a hard decision.", vi:"Đó là một quyết định khó."},{en:"She made the right decision.", vi:"Cô ấy đã quyết định đúng."}]},
  {id:493, word:"degree", ipa:"/dɪˈɡriː/", pos:"noun", level:1, vi:"độ (nhiệt độ); bằng cấp", examples:[{en:"It is thirty degrees today.", vi:"Hôm nay ba mươi độ."},{en:"He has a degree in math.", vi:"Anh ấy có bằng về toán."}]},
  {id:494, word:"desk", ipa:"/desk/", pos:"noun", level:1, vi:"bàn làm việc, bàn học", examples:[{en:"My books are on the desk.", vi:"Sách của tôi ở trên bàn."},{en:"She sat at her desk.", vi:"Cô ấy ngồi vào bàn làm việc."}]},
  {id:495, word:"detail", ipa:"/ˈdiːteɪl/", pos:"noun", level:1, vi:"chi tiết", examples:[{en:"Tell me every detail.", vi:"Kể tôi nghe từng chi tiết."},{en:"The plan needs more detail.", vi:"Kế hoạch cần chi tiết hơn."}]},
  {id:496, word:"difference", ipa:"/ˈdɪfrəns/", pos:"noun", level:1, vi:"sự khác biệt", examples:[{en:"What is the difference?", vi:"Sự khác biệt là gì?"},{en:"It makes no difference to me.", vi:"Với tôi thì cũng như nhau."}]},
  {id:497, word:"direction", ipa:"/dəˈrekʃn/", pos:"noun", level:1, vi:"hướng; sự chỉ dẫn", examples:[{en:"We walked in the wrong direction.", vi:"Chúng tôi đi sai hướng."},{en:"Can you give me directions?", vi:"Bạn chỉ đường cho tôi được không?"}]},
  {id:498, word:"driver", ipa:"/ˈdraɪvər/", pos:"noun", level:1, vi:"người lái xe, tài xế", examples:[{en:"The bus driver is friendly.", vi:"Bác tài xe buýt thân thiện."},{en:"She is a careful driver.", vi:"Cô ấy là một người lái xe cẩn thận."}]},
  {id:499, word:"drug", ipa:"/drʌɡ/", pos:"noun", level:1, vi:"thuốc; chất gây nghiện", examples:[{en:"The doctor gave me a new drug.", vi:"Bác sĩ cho tôi một loại thuốc mới."},{en:"Some drugs are dangerous.", vi:"Một số loại thuốc rất nguy hiểm."}]},
  {id:500, word:"duck", ipa:"/dʌk/", pos:"noun", level:1, vi:"con vịt", examples:[{en:"Ducks are swimming in the pond.", vi:"Những con vịt đang bơi dưới ao."},{en:"The duck has yellow feet.", vi:"Con vịt có đôi chân vàng."}]},
  {id:501, word:"ear", ipa:"/ɪr/", pos:"noun", level:1, vi:"cái tai", examples:[{en:"My ears hurt.", vi:"Tai tôi đau."},{en:"Rabbits have long ears.", vi:"Thỏ có đôi tai dài."}]},
  {id:502, word:"edge", ipa:"/edʒ/", pos:"noun", level:1, vi:"cạnh, mép, rìa", examples:[{en:"Don't sit on the edge of the table.", vi:"Đừng ngồi ở mép bàn."},{en:"We stood at the edge of the forest.", vi:"Chúng tôi đứng ở bìa rừng."}]},
  {id:503, word:"effort", ipa:"/ˈefərt/", pos:"noun", level:1, vi:"sự nỗ lực, công sức", examples:[{en:"Thank you for your effort.", vi:"Cảm ơn vì công sức của bạn."},{en:"It takes a lot of effort.", vi:"Việc đó cần nhiều nỗ lực."}]},
  {id:504, word:"egg", ipa:"/eɡ/", pos:"noun", level:1, vi:"quả trứng", examples:[{en:"I had two eggs for breakfast.", vi:"Tôi ăn hai quả trứng vào bữa sáng."},{en:"The bird laid an egg.", vi:"Con chim đẻ một quả trứng."}]},
  {id:505, word:"energy", ipa:"/ˈenərdʒi/", pos:"noun", level:1, vi:"năng lượng; sức lực", examples:[{en:"The sun gives us energy.", vi:"Mặt trời cho chúng ta năng lượng."},{en:"I have no energy today.", vi:"Hôm nay tôi không có sức."}]},
  {id:506, word:"engine", ipa:"/ˈendʒɪn/", pos:"noun", level:1, vi:"động cơ, máy", examples:[{en:"The car engine is loud.", vi:"Động cơ xe kêu to."},{en:"The engine won't start.", vi:"Động cơ không khởi động được."}]},
  {id:507, word:"event", ipa:"/ɪˈvent/", pos:"noun", level:1, vi:"sự kiện", examples:[{en:"The event starts at noon.", vi:"Sự kiện bắt đầu lúc trưa."},{en:"It was a big event.", vi:"Đó là một sự kiện lớn."}]},
  {id:508, word:"exam", ipa:"/ɪɡˈzæm/", pos:"noun", level:1, vi:"kỳ thi, bài thi", examples:[{en:"I have an exam tomorrow.", vi:"Mai tôi có bài thi."},{en:"She passed her exam.", vi:"Cô ấy đã đậu kỳ thi."}]},
  {id:509, word:"exercise", ipa:"/ˈeksərsaɪz/", pos:"noun", level:1, vi:"bài tập; sự tập thể dục", examples:[{en:"Do this exercise at home.", vi:"Làm bài tập này ở nhà."},{en:"Exercise is good for you.", vi:"Tập thể dục tốt cho bạn."}]},
  {id:510, word:"experience", ipa:"/ɪkˈspɪriəns/", pos:"noun", level:1, vi:"kinh nghiệm; trải nghiệm", examples:[{en:"She has a lot of experience.", vi:"Cô ấy có nhiều kinh nghiệm."},{en:"It was a great experience.", vi:"Đó là một trải nghiệm tuyệt vời."}]},
  {id:511, word:"factory", ipa:"/ˈfæktri/", pos:"noun", level:1, vi:"nhà máy", examples:[{en:"He works in a factory.", vi:"Anh ấy làm việc trong nhà máy."},{en:"The factory makes shoes.", vi:"Nhà máy sản xuất giày."}]},
  {id:512, word:"fan", ipa:"/fæn/", pos:"noun", level:1, vi:"cái quạt; người hâm mộ", examples:[{en:"Turn on the fan, it's hot.", vi:"Bật quạt lên, trời nóng."},{en:"I am a big fan of this singer.", vi:"Tôi là người hâm mộ lớn của ca sĩ này."}]},
  {id:513, word:"fashion", ipa:"/ˈfæʃn/", pos:"noun", level:1, vi:"thời trang", examples:[{en:"She loves fashion.", vi:"Cô ấy yêu thời trang."},{en:"This style is in fashion now.", vi:"Kiểu này đang là mốt."}]},
  {id:514, word:"fear", ipa:"/fɪr/", pos:"noun", level:1, vi:"nỗi sợ, sự sợ hãi", examples:[{en:"He has a fear of heights.", vi:"Anh ấy sợ độ cao."},{en:"There is nothing to fear.", vi:"Không có gì phải sợ."}]},
  {id:515, word:"feeling", ipa:"/ˈfiːlɪŋ/", pos:"noun", level:1, vi:"cảm giác, cảm xúc", examples:[{en:"I have a good feeling about this.", vi:"Tôi có cảm giác tốt về việc này."},{en:"Don't hide your feelings.", vi:"Đừng giấu cảm xúc của bạn."}]},
  {id:516, word:"fever", ipa:"/ˈfiːvər/", pos:"noun", level:1, vi:"cơn sốt", examples:[{en:"The child has a fever.", vi:"Đứa trẻ bị sốt."},{en:"I had a high fever last night.", vi:"Tối qua tôi sốt cao."}]},
  {id:517, word:"finger", ipa:"/ˈfɪŋɡər/", pos:"noun", level:1, vi:"ngón tay", examples:[{en:"I cut my finger.", vi:"Tôi bị đứt tay."},{en:"We have ten fingers.", vi:"Chúng ta có mười ngón tay."}]},
  {id:518, word:"flag", ipa:"/flæɡ/", pos:"noun", level:1, vi:"lá cờ", examples:[{en:"The flag is red and yellow.", vi:"Lá cờ màu đỏ và vàng."},{en:"They raised the flag.", vi:"Họ kéo cờ lên."}]},
  {id:519, word:"flight", ipa:"/flaɪt/", pos:"noun", level:1, vi:"chuyến bay", examples:[{en:"My flight is at noon.", vi:"Chuyến bay của tôi lúc trưa."},{en:"The flight was delayed.", vi:"Chuyến bay bị hoãn."}]},
  {id:520, word:"floor", ipa:"/flɔːr/", pos:"noun", level:1, vi:"sàn nhà; tầng (nhà)", examples:[{en:"Don't sit on the floor.", vi:"Đừng ngồi trên sàn."},{en:"My office is on the third floor.", vi:"Văn phòng tôi ở tầng ba."}]},
  {id:521, word:"fog", ipa:"/fɔːɡ/", pos:"noun", level:1, vi:"sương mù", examples:[{en:"There is thick fog this morning.", vi:"Sáng nay sương mù dày đặc."},{en:"We can't see far in the fog.", vi:"Chúng ta không nhìn xa được trong sương mù."}]},
  {id:522, word:"form", ipa:"/fɔːrm/", pos:"noun", level:1, vi:"mẫu đơn; hình thức, dạng", examples:[{en:"Please fill in this form.", vi:"Vui lòng điền vào mẫu đơn này."},{en:"Water can take many forms.", vi:"Nước có thể tồn tại ở nhiều dạng."}]},
  {id:523, word:"fridge", ipa:"/frɪdʒ/", pos:"noun", level:1, vi:"tủ lạnh", examples:[{en:"Put the milk in the fridge.", vi:"Để sữa vào tủ lạnh."},{en:"The fridge is empty.", vi:"Tủ lạnh trống không."}]},
  {id:524, word:"front", ipa:"/frʌnt/", pos:"noun", level:1, vi:"phía trước, mặt trước", examples:[{en:"He sits in the front of the class.", vi:"Anh ấy ngồi ở phía trước lớp."},{en:"Wait for me in front of the shop.", vi:"Đợi tôi ở trước cửa hàng nhé."}]},
  {id:525, word:"fruit", ipa:"/fruːt/", pos:"noun", level:1, vi:"trái cây, hoa quả", examples:[{en:"I eat a lot of fruit.", vi:"Tôi ăn nhiều trái cây."},{en:"Apples and bananas are fruit.", vi:"Táo và chuối là trái cây."}]},
  {id:526, word:"gas", ipa:"/ɡæs/", pos:"noun", level:1, vi:"khí ga; xăng (cách dùng ở Mỹ)", examples:[{en:"Turn off the gas.", vi:"Tắt ga đi."},{en:"We need to buy gas for the car.", vi:"Chúng ta cần đổ xăng cho xe."}]},
  {id:527, word:"gate", ipa:"/ɡeɪt/", pos:"noun", level:1, vi:"cái cổng", examples:[{en:"Please close the gate.", vi:"Vui lòng đóng cổng."},{en:"The dog is at the gate.", vi:"Con chó ở ngoài cổng."}]},
  {id:528, word:"ghost", ipa:"/ɡoʊst/", pos:"noun", level:1, vi:"con ma, hồn ma", examples:[{en:"Do you believe in ghosts?", vi:"Bạn có tin vào ma không?"},{en:"It is just a ghost story.", vi:"Đó chỉ là một câu chuyện ma."}]},
  {id:529, word:"goal", ipa:"/ɡoʊl/", pos:"noun", level:1, vi:"mục tiêu; bàn thắng", examples:[{en:"My goal is to learn English.", vi:"Mục tiêu của tôi là học tiếng Anh."},{en:"He scored a goal.", vi:"Anh ấy ghi một bàn thắng."}]},
  {id:530, word:"grass", ipa:"/ɡræs/", pos:"noun", level:1, vi:"cỏ", examples:[{en:"The grass is green.", vi:"Cỏ xanh."},{en:"Don't walk on the grass.", vi:"Đừng giẫm lên cỏ."}]},
  {id:531, word:"alive", ipa:"/əˈlaɪv/", pos:"adjective", level:1, vi:"còn sống", examples:[{en:"The fish is still alive.", vi:"Con cá vẫn còn sống."},{en:"It is good to be alive.", vi:"Được sống thật tốt."}]},
  {id:532, word:"dead", ipa:"/ded/", pos:"adjective", level:1, vi:"đã chết; hết (pin)", examples:[{en:"The plant is dead.", vi:"Cái cây đã chết."},{en:"My phone is dead.", vi:"Điện thoại của tôi hết pin."}]},
  {id:533, word:"alone", ipa:"/əˈloʊn/", pos:"adjective / adverb", level:1, vi:"một mình, cô đơn", examples:[{en:"She lives alone.", vi:"Cô ấy sống một mình."},{en:"I don't like to eat alone.", vi:"Tôi không thích ăn một mình."}]},
  {id:534, word:"ancient", ipa:"/ˈeɪnʃənt/", pos:"adjective", level:1, vi:"cổ xưa, cổ đại", examples:[{en:"This is an ancient city.", vi:"Đây là một thành phố cổ."},{en:"They found an ancient coin.", vi:"Họ tìm thấy một đồng xu cổ."}]},
  {id:535, word:"brave", ipa:"/breɪv/", pos:"adjective", level:1, vi:"dũng cảm, can đảm", examples:[{en:"He is a brave boy.", vi:"Cậu ấy là một cậu bé dũng cảm."},{en:"Be brave and try again.", vi:"Hãy can đảm và thử lại."}]},
  {id:536, word:"bright", ipa:"/braɪt/", pos:"adjective", level:1, vi:"sáng, tươi sáng; thông minh", examples:[{en:"The sun is very bright.", vi:"Mặt trời rất sáng."},{en:"She is a bright student.", vi:"Cô ấy là một học sinh thông minh."}]},
  {id:537, word:"wide", ipa:"/waɪd/", pos:"adjective", level:1, vi:"rộng", examples:[{en:"The river is very wide.", vi:"Dòng sông rất rộng."},{en:"Open your mouth wide.", vi:"Há miệng to ra."}]},
  {id:538, word:"calm", ipa:"/kɑːm/", pos:"adjective", level:1, vi:"bình tĩnh; yên ả", examples:[{en:"Please stay calm.", vi:"Vui lòng giữ bình tĩnh."},{en:"The sea is calm today.", vi:"Hôm nay biển lặng."}]},
  {id:539, word:"certain", ipa:"/ˈsɜːrtn/", pos:"adjective", level:1, vi:"chắc chắn", examples:[{en:"Are you certain about this?", vi:"Bạn chắc chắn về điều này chứ?"},{en:"I am certain she will come.", vi:"Tôi chắc cô ấy sẽ đến."}]},
  {id:540, word:"thirsty", ipa:"/ˈθɜːrsti/", pos:"adjective", level:1, vi:"khát (nước)", examples:[{en:"I am very thirsty.", vi:"Tôi rất khát."},{en:"The runner felt thirsty.", vi:"Người chạy bộ thấy khát."}]},
  {id:541, word:"comfortable", ipa:"/ˈkʌmftəbl/", pos:"adjective", level:1, vi:"thoải mái, dễ chịu", examples:[{en:"This chair is very comfortable.", vi:"Cái ghế này rất thoải mái."},{en:"Make yourself comfortable.", vi:"Cứ tự nhiên thoải mái nhé."}]},
  {id:542, word:"common", ipa:"/ˈkɑːmən/", pos:"adjective", level:1, vi:"phổ biến, thường gặp; chung", examples:[{en:"This is a common mistake.", vi:"Đây là một lỗi thường gặp."},{en:"We have a common goal.", vi:"Chúng ta có một mục tiêu chung."}]},
  {id:543, word:"crazy", ipa:"/ˈkreɪzi/", pos:"adjective", level:1, vi:"điên rồ, khùng (cách nói thân mật)", examples:[{en:"That's a crazy idea.", vi:"Đó là một ý tưởng điên rồ."},{en:"The traffic is crazy today.", vi:"Giao thông hôm nay điên rồ thật."}]},
  {id:544, word:"dangerous", ipa:"/ˈdeɪndʒərəs/", pos:"adjective", level:1, vi:"nguy hiểm", examples:[{en:"This road is dangerous at night.", vi:"Con đường này nguy hiểm vào ban đêm."},{en:"Fire is dangerous.", vi:"Lửa thì nguy hiểm."}]},
  {id:545, word:"delicious", ipa:"/dɪˈlɪʃəs/", pos:"adjective", level:1, vi:"ngon, ngon tuyệt", examples:[{en:"This soup is delicious.", vi:"Món súp này ngon tuyệt."},{en:"What a delicious meal!", vi:"Bữa ăn ngon quá!"}]},
  {id:546, word:"difficult", ipa:"/ˈdɪfɪkəlt/", pos:"adjective", level:1, vi:"khó, khó khăn", examples:[{en:"This question is difficult.", vi:"Câu hỏi này khó."},{en:"It was a difficult year.", vi:"Đó là một năm khó khăn."}]},
  {id:547, word:"excited", ipa:"/ɪkˈsaɪtɪd/", pos:"adjective", level:1, vi:"hào hứng, phấn khích", examples:[{en:"I am excited about the trip.", vi:"Tôi háo hức về chuyến đi."},{en:"The children are excited.", vi:"Bọn trẻ rất phấn khích."}]},
  {id:548, word:"fair", ipa:"/fer/", pos:"adjective", level:1, vi:"công bằng; hợp lý", examples:[{en:"That's not fair!", vi:"Như vậy không công bằng!"},{en:"We want a fair price.", vi:"Chúng tôi muốn một mức giá hợp lý."}]},
  {id:549, word:"favorite", ipa:"/ˈfeɪvərɪt/", pos:"adjective", level:1, vi:"yêu thích nhất", examples:[{en:"Blue is my favorite color.", vi:"Xanh dương là màu tôi thích nhất."},{en:"What is your favorite food?", vi:"Món ăn yêu thích của bạn là gì?"}]},
  {id:550, word:"final", ipa:"/ˈfaɪnl/", pos:"adjective", level:1, vi:"cuối cùng", examples:[{en:"This is my final answer.", vi:"Đây là câu trả lời cuối cùng của tôi."},{en:"The final game is tonight.", vi:"Trận chung kết diễn ra tối nay."}]},
  {id:551, word:"foreign", ipa:"/ˈfɔːrən/", pos:"adjective", level:1, vi:"nước ngoài, ngoại quốc", examples:[{en:"She speaks two foreign languages.", vi:"Cô ấy nói hai ngoại ngữ."},{en:"I met some foreign students.", vi:"Tôi gặp vài sinh viên nước ngoài."}]},
  {id:552, word:"fresh", ipa:"/freʃ/", pos:"adjective", level:1, vi:"tươi, tươi mới", examples:[{en:"I like fresh fruit.", vi:"Tôi thích trái cây tươi."},{en:"Let's get some fresh air.", vi:"Mình ra hít thở không khí trong lành nào."}]},
  {id:553, word:"friendly", ipa:"/ˈfrendli/", pos:"adjective", level:1, vi:"thân thiện", examples:[{en:"The people here are friendly.", vi:"Người ở đây rất thân thiện."},{en:"She has a friendly smile.", vi:"Cô ấy có nụ cười thân thiện."}]},
  {id:554, word:"gentle", ipa:"/ˈdʒentl/", pos:"adjective", level:1, vi:"nhẹ nhàng, dịu dàng", examples:[{en:"Be gentle with the baby.", vi:"Hãy nhẹ nhàng với em bé."},{en:"A gentle wind was blowing.", vi:"Một làn gió nhẹ đang thổi."}]},
  {id:555, word:"healthy", ipa:"/ˈhelθi/", pos:"adjective", level:1, vi:"khỏe mạnh; lành mạnh", examples:[{en:"Eat healthy food.", vi:"Hãy ăn đồ ăn lành mạnh."},{en:"She is strong and healthy.", vi:"Cô ấy khỏe mạnh."}]},
  {id:556, word:"honest", ipa:"/ˈɑːnɪst/", pos:"adjective", level:1, vi:"trung thực, thật thà", examples:[{en:"He is an honest man.", vi:"Anh ấy là một người trung thực."},{en:"Please be honest with me.", vi:"Hãy thành thật với tôi."}]},
  {id:557, word:"hungry", ipa:"/ˈhʌŋɡri/", pos:"adjective", level:1, vi:"đói", examples:[{en:"I am very hungry.", vi:"Tôi rất đói."},{en:"Are you hungry yet?", vi:"Bạn đói chưa?"}]},
  {id:558, word:"interesting", ipa:"/ˈɪntrəstɪŋ/", pos:"adjective", level:1, vi:"thú vị, hay", examples:[{en:"This book is very interesting.", vi:"Cuốn sách này rất thú vị."},{en:"She told an interesting story.", vi:"Cô ấy kể một câu chuyện thú vị."}]},
  {id:559, word:"light", ipa:"/laɪt/", pos:"adjective", level:1, vi:"nhẹ; nhạt (màu)", examples:[{en:"This bag is light.", vi:"Cái túi này nhẹ."},{en:"She wore a light blue dress.", vi:"Cô ấy mặc một chiếc váy xanh nhạt."}]},
  {id:560, word:"loud", ipa:"/laʊd/", pos:"adjective", level:1, vi:"to, ồn ào", examples:[{en:"The music is too loud.", vi:"Nhạc to quá."},{en:"Don't be so loud.", vi:"Đừng ồn ào thế."}]},
  {id:561, word:"lovely", ipa:"/ˈlʌvli/", pos:"adjective", level:1, vi:"đáng yêu, dễ thương, đẹp", examples:[{en:"What a lovely garden!", vi:"Khu vườn đẹp quá!"},{en:"She is a lovely person.", vi:"Cô ấy là một người dễ mến."}]},
  {id:562, word:"wonderful", ipa:"/ˈwʌndərfl/", pos:"adjective", level:1, vi:"tuyệt vời", examples:[{en:"We had a wonderful time.", vi:"Chúng tôi đã có khoảng thời gian tuyệt vời."},{en:"What a wonderful surprise!", vi:"Một bất ngờ tuyệt vời!"}]},
  {id:563, word:"narrow", ipa:"/ˈnæroʊ/", pos:"adjective", level:1, vi:"hẹp", examples:[{en:"This is a narrow street.", vi:"Đây là một con phố hẹp."},{en:"The path is too narrow.", vi:"Lối đi hẹp quá."}]},
  {id:564, word:"natural", ipa:"/ˈnætʃrəl/", pos:"adjective", level:1, vi:"tự nhiên, thiên nhiên", examples:[{en:"I prefer natural light.", vi:"Tôi thích ánh sáng tự nhiên hơn."},{en:"Honey is a natural food.", vi:"Mật ong là một thực phẩm tự nhiên."}]},
  {id:565, word:"normal", ipa:"/ˈnɔːrml/", pos:"adjective", level:1, vi:"bình thường", examples:[{en:"It is normal to feel tired.", vi:"Cảm thấy mệt là chuyện bình thường."},{en:"Everything looks normal.", vi:"Mọi thứ trông bình thường."}]},
  {id:566, word:"polite", ipa:"/pəˈlaɪt/", pos:"adjective", level:1, vi:"lịch sự", examples:[{en:"She is always polite.", vi:"Cô ấy luôn lịch sự."},{en:"It is polite to say thank you.", vi:"Nói cảm ơn là lịch sự."}]},
  {id:567, word:"popular", ipa:"/ˈpɑːpjələr/", pos:"adjective", level:1, vi:"được ưa chuộng, nổi tiếng", examples:[{en:"This song is very popular.", vi:"Bài hát này rất được ưa chuộng."},{en:"He is popular at school.", vi:"Cậu ấy được yêu mến ở trường."}]},
  {id:568, word:"possible", ipa:"/ˈpɑːsəbl/", pos:"adjective", level:1, vi:"có thể, khả thi", examples:[{en:"Is it possible to change the date?", vi:"Có thể đổi ngày được không?"},{en:"Anything is possible.", vi:"Mọi thứ đều có thể."}]},
  {id:569, word:"powerful", ipa:"/ˈpaʊərfl/", pos:"adjective", level:1, vi:"mạnh mẽ, đầy sức mạnh", examples:[{en:"This is a powerful engine.", vi:"Đây là một động cơ mạnh."},{en:"She gave a powerful speech.", vi:"Cô ấy có một bài phát biểu đầy sức thuyết phục."}]},
  {id:570, word:"proud", ipa:"/praʊd/", pos:"adjective", level:1, vi:"tự hào, hãnh diện", examples:[{en:"I am proud of you.", vi:"Tôi tự hào về bạn."},{en:"She is proud of her work.", vi:"Cô ấy tự hào về công việc của mình."}]},
  {id:571, word:"because", ipa:"/bɪˈkɔːz/", pos:"conjunction", level:1, vi:"bởi vì, vì", examples:[{en:"I stayed home because it was raining.", vi:"Tôi ở nhà vì trời mưa."},{en:"She is happy because she passed.", vi:"Cô ấy vui vì đã đậu."}]},
  {id:572, word:"if", ipa:"/ɪf/", pos:"conjunction", level:1, vi:"nếu", examples:[{en:"Call me if you need help.", vi:"Gọi tôi nếu bạn cần giúp."},{en:"If it rains, we will stay in.", vi:"Nếu trời mưa, chúng ta sẽ ở trong nhà."}]},
  {id:573, word:"although", ipa:"/ɔːlˈðoʊ/", pos:"conjunction", level:1, vi:"mặc dù", examples:[{en:"Although it was cold, we went out.", vi:"Mặc dù trời lạnh, chúng tôi vẫn ra ngoài."},{en:"She smiled, although she was tired.", vi:"Cô ấy mỉm cười, dù đang mệt."}]},
  {id:574, word:"while", ipa:"/waɪl/", pos:"conjunction", level:1, vi:"trong khi", examples:[{en:"I read while I wait.", vi:"Tôi đọc sách trong khi chờ."},{en:"She sang while cooking.", vi:"Cô ấy hát trong khi nấu ăn."}]},
  {id:575, word:"until", ipa:"/ənˈtɪl/", pos:"preposition / conjunction", level:1, vi:"cho đến (khi)", examples:[{en:"Wait here until I come back.", vi:"Đợi ở đây cho đến khi tôi quay lại."},{en:"The shop is open until ten.", vi:"Cửa hàng mở đến mười giờ."}]},
  {id:576, word:"between", ipa:"/bɪˈtwiːn/", pos:"preposition", level:1, vi:"giữa (hai vật)", examples:[{en:"The shop is between the bank and the café.", vi:"Cửa hàng nằm giữa ngân hàng và quán cà phê."},{en:"Sit between us.", vi:"Ngồi giữa chúng tôi nào."}]},
  {id:577, word:"among", ipa:"/əˈmʌŋ/", pos:"preposition", level:1, vi:"giữa, ở giữa (nhiều vật)", examples:[{en:"She is popular among students.", vi:"Cô ấy được yêu mến trong giới học sinh."},{en:"I found it among my books.", vi:"Tôi tìm thấy nó giữa đống sách."}]},
  {id:578, word:"against", ipa:"/əˈɡenst/", pos:"preposition", level:1, vi:"chống lại; dựa vào", examples:[{en:"We are against the plan.", vi:"Chúng tôi phản đối kế hoạch này."},{en:"He leaned against the wall.", vi:"Anh ấy tựa vào tường."}]},
  {id:579, word:"during", ipa:"/ˈdʊrɪŋ/", pos:"preposition", level:1, vi:"trong suốt, trong lúc", examples:[{en:"Don't talk during the film.", vi:"Đừng nói chuyện trong lúc xem phim."},{en:"She slept during the trip.", vi:"Cô ấy ngủ suốt chuyến đi."}]},
  {id:580, word:"through", ipa:"/θruː/", pos:"preposition", level:1, vi:"qua, xuyên qua", examples:[{en:"We walked through the park.", vi:"Chúng tôi đi xuyên qua công viên."},{en:"The train went through a tunnel.", vi:"Đoàn tàu chạy qua một đường hầm."}]},
  {id:581, word:"across", ipa:"/əˈkrɔːs/", pos:"preposition", level:1, vi:"qua, băng qua; bên kia", examples:[{en:"We walked across the bridge.", vi:"Chúng tôi đi qua cây cầu."},{en:"The shop is across the street.", vi:"Cửa hàng ở bên kia đường."}]},
  {id:582, word:"behind", ipa:"/bɪˈhaɪnd/", pos:"preposition", level:1, vi:"phía sau, đằng sau", examples:[{en:"The car is behind the house.", vi:"Chiếc xe ở sau nhà."},{en:"She is hiding behind the door.", vi:"Cô ấy đang trốn sau cánh cửa."}]},
  {id:583, word:"below", ipa:"/bɪˈloʊ/", pos:"preposition / adverb", level:1, vi:"bên dưới, ở dưới", examples:[{en:"The temperature is below zero.", vi:"Nhiệt độ dưới không độ."},{en:"Write your name below.", vi:"Viết tên bạn ở bên dưới."}]},
  {id:584, word:"above", ipa:"/əˈbʌv/", pos:"preposition / adverb", level:1, vi:"bên trên, ở trên", examples:[{en:"The plane flew above the clouds.", vi:"Máy bay bay trên những đám mây."},{en:"There is a lamp above the table.", vi:"Có một cái đèn phía trên bàn."}]},
  {id:585, word:"beside", ipa:"/bɪˈsaɪd/", pos:"preposition", level:1, vi:"bên cạnh", examples:[{en:"Sit beside me.", vi:"Ngồi cạnh tôi nào."},{en:"The dog sat beside the door.", vi:"Con chó ngồi cạnh cửa."}]},
  {id:586, word:"without", ipa:"/wɪˈðaʊt/", pos:"preposition", level:1, vi:"không có, thiếu", examples:[{en:"I can't see without my glasses.", vi:"Tôi không nhìn được nếu không có kính."},{en:"She left without a word.", vi:"Cô ấy rời đi không nói một lời."}]},
  {id:587, word:"within", ipa:"/wɪˈðɪn/", pos:"preposition", level:1, vi:"trong vòng, bên trong", examples:[{en:"I will reply within an hour.", vi:"Tôi sẽ trả lời trong vòng một tiếng."},{en:"The school is within walking distance.", vi:"Trường học nằm trong khoảng cách đi bộ."}]},
  {id:588, word:"toward", ipa:"/tɔːrd/", pos:"preposition", level:1, vi:"về phía, hướng về", examples:[{en:"She walked toward the door.", vi:"Cô ấy bước về phía cửa."},{en:"We drove toward the city.", vi:"Chúng tôi lái xe về phía thành phố."}]},
  {id:589, word:"inside", ipa:"/ɪnˈsaɪd/", pos:"preposition / adverb", level:1, vi:"bên trong, ở trong", examples:[{en:"Let's stay inside.", vi:"Mình ở trong nhà nhé."},{en:"The keys are inside the bag.", vi:"Chìa khóa ở trong túi."}]},
  {id:590, word:"outside", ipa:"/ˌaʊtˈsaɪd/", pos:"preposition / adverb", level:1, vi:"bên ngoài, ở ngoài", examples:[{en:"The kids are playing outside.", vi:"Bọn trẻ đang chơi bên ngoài."},{en:"Wait for me outside the shop.", vi:"Đợi tôi ở ngoài cửa hàng nhé."}]},
  {id:591, word:"forward", ipa:"/ˈfɔːrwərd/", pos:"adverb", level:1, vi:"về phía trước, tiến lên", examples:[{en:"Please move forward.", vi:"Vui lòng tiến lên phía trước."},{en:"I look forward to seeing you.", vi:"Tôi mong được gặp bạn."}]},
  {id:592, word:"anyway", ipa:"/ˈeniweɪ/", pos:"adverb", level:1, vi:"dù sao thì, dẫu sao", examples:[{en:"It's late, but let's try anyway.", vi:"Muộn rồi, nhưng dù sao cứ thử xem."},{en:"Thanks anyway.", vi:"Dù sao cũng cảm ơn."}]},
  {id:593, word:"probably", ipa:"/ˈprɑːbəbli/", pos:"adverb", level:1, vi:"có lẽ, chắc là", examples:[{en:"She is probably at home.", vi:"Có lẽ cô ấy đang ở nhà."},{en:"It will probably rain.", vi:"Chắc là trời sẽ mưa."}]},
  {id:594, word:"usually", ipa:"/ˈjuːʒuəli/", pos:"adverb", level:1, vi:"thường, thường lệ", examples:[{en:"I usually wake up at six.", vi:"Tôi thường dậy lúc sáu giờ."},{en:"She is usually busy on Mondays.", vi:"Cô ấy thường bận vào thứ Hai."}]},
  {id:595, word:"suddenly", ipa:"/ˈsʌdənli/", pos:"adverb", level:1, vi:"đột nhiên, bỗng nhiên", examples:[{en:"Suddenly, the lights went out.", vi:"Bỗng nhiên, đèn tắt."},{en:"He suddenly stopped.", vi:"Anh ấy đột ngột dừng lại."}]},
  {id:596, word:"everyone", ipa:"/ˈevriwʌn/", pos:"pronoun", level:1, vi:"mọi người, tất cả mọi người", examples:[{en:"Everyone is here.", vi:"Mọi người đều đã ở đây."},{en:"Everyone loves a holiday.", vi:"Ai cũng thích ngày nghỉ."}]},
  {id:597, word:"everything", ipa:"/ˈevriθɪŋ/", pos:"pronoun", level:1, vi:"mọi thứ, tất cả", examples:[{en:"Everything is ready.", vi:"Mọi thứ đã sẵn sàng."},{en:"Thank you for everything.", vi:"Cảm ơn vì tất cả."}]},
  {id:598, word:"anyone", ipa:"/ˈeniwʌn/", pos:"pronoun", level:1, vi:"bất cứ ai; (phủ định) ai cả", examples:[{en:"Is anyone home?", vi:"Có ai ở nhà không?"},{en:"I didn't tell anyone.", vi:"Tôi không nói với ai cả."}]},
  {id:599, word:"something", ipa:"/ˈsʌmθɪŋ/", pos:"pronoun", level:1, vi:"cái gì đó, điều gì đó", examples:[{en:"I want something to eat.", vi:"Tôi muốn ăn gì đó."},{en:"There is something on the table.", vi:"Có cái gì đó trên bàn."}]},
  {id:600, word:"nothing", ipa:"/ˈnʌθɪŋ/", pos:"pronoun", level:1, vi:"không gì cả", examples:[{en:"There is nothing in the box.", vi:"Không có gì trong hộp cả."},{en:"I have nothing to do today.", vi:"Hôm nay tôi chẳng có việc gì làm."}]}
  // ===== LÔ 5: 200 từ Level 1 tiếp theo (id 601-800) =====
  // Dán toàn bộ khối này vào sau từ id:600 "nothing" trong mảng WORDS (trước dấu ]).
  // Khối đã có sẵn dấu phẩy đứng đầu nên nối liền, không cần sửa gì thêm.
  ,{id:601, word:"act", ipa:"/ækt/", pos:"verb", level:1, vi:"hành động; diễn (kịch)", examples:[{en:"We must act now.", vi:"Chúng ta phải hành động ngay."},{en:"She acts in a play.", vi:"Cô ấy diễn trong một vở kịch."}]},
  {id:602, word:"admit", ipa:"/ədˈmɪt/", pos:"verb", level:1, vi:"thừa nhận, công nhận", examples:[{en:"He admitted his mistake.", vi:"Anh ấy thừa nhận lỗi của mình."},{en:"I admit I was wrong.", vi:"Tôi công nhận là tôi đã sai."}]},
  {id:603, word:"advise", ipa:"/ədˈvaɪz/", pos:"verb", level:1, vi:"khuyên, tư vấn", examples:[{en:"The doctor advised me to rest.", vi:"Bác sĩ khuyên tôi nghỉ ngơi."},{en:"What do you advise?", vi:"Bạn khuyên gì nào?"}]},
  {id:604, word:"argue", ipa:"/ˈɑːrɡjuː/", pos:"verb", level:1, vi:"tranh cãi, cãi nhau", examples:[{en:"They argue about money.", vi:"Họ cãi nhau về tiền bạc."},{en:"Please don't argue.", vi:"Đừng cãi nhau nữa."}]},
  {id:605, word:"arrange", ipa:"/əˈreɪndʒ/", pos:"verb", level:1, vi:"sắp xếp, thu xếp", examples:[{en:"I arranged the books on the shelf.", vi:"Tôi sắp xếp sách lên kệ."},{en:"Let's arrange a meeting.", vi:"Mình thu xếp một buổi gặp nhé."}]},
  {id:606, word:"attack", ipa:"/əˈtæk/", pos:"verb", level:1, vi:"tấn công", examples:[{en:"The dog attacked the cat.", vi:"Con chó tấn công con mèo."},{en:"Do not attack first.", vi:"Đừng tấn công trước."}]},
  {id:607, word:"avoid", ipa:"/əˈvɔɪd/", pos:"verb", level:1, vi:"tránh, né tránh", examples:[{en:"Avoid the busy road.", vi:"Tránh con đường đông xe."},{en:"She avoids spicy food.", vi:"Cô ấy tránh ăn đồ cay."}]},
  {id:608, word:"bake", ipa:"/beɪk/", pos:"verb", level:1, vi:"nướng (bánh)", examples:[{en:"She bakes bread every morning.", vi:"Cô ấy nướng bánh mì mỗi sáng."},{en:"Let's bake a cake.", vi:"Mình nướng bánh nhé."}]},
  {id:609, word:"beg", ipa:"/beɡ/", pos:"verb", level:1, vi:"van xin, cầu xin", examples:[{en:"The dog begs for food.", vi:"Con chó xin ăn."},{en:"I beg you to stay.", vi:"Tôi xin bạn ở lại."}]},
  {id:610, word:"belong", ipa:"/bɪˈlɔːŋ/", pos:"verb", level:1, vi:"thuộc về", examples:[{en:"This book belongs to me.", vi:"Cuốn sách này là của tôi."},{en:"Where does this belong?", vi:"Cái này để ở đâu nhỉ?"}]},
  {id:611, word:"bend", ipa:"/bend/", pos:"verb", level:1, vi:"uốn cong; cúi xuống", examples:[{en:"Bend your knees.", vi:"Gập đầu gối lại."},{en:"The road bends to the left.", vi:"Con đường rẽ cong sang trái."}]},
  {id:612, word:"bite", ipa:"/baɪt/", pos:"verb", level:1, vi:"cắn", examples:[{en:"The dog bit my hand.", vi:"Con chó cắn tay tôi."},{en:"Don't bite your nails.", vi:"Đừng cắn móng tay."}]},
  {id:613, word:"blow", ipa:"/bloʊ/", pos:"verb", level:1, vi:"thổi", examples:[{en:"The wind is blowing.", vi:"Gió đang thổi."},{en:"Blow out the candles.", vi:"Thổi tắt nến đi."}]},
  {id:614, word:"boil", ipa:"/bɔɪl/", pos:"verb", level:1, vi:"đun sôi, luộc", examples:[{en:"Boil the water first.", vi:"Đun sôi nước trước."},{en:"She is boiling some eggs.", vi:"Cô ấy đang luộc trứng."}]},
  {id:615, word:"bother", ipa:"/ˈbɑːðər/", pos:"verb", level:1, vi:"làm phiền, quấy rầy", examples:[{en:"Sorry to bother you.", vi:"Xin lỗi đã làm phiền bạn."},{en:"The noise bothers me.", vi:"Tiếng ồn làm tôi khó chịu."}]},
  {id:616, word:"breathe", ipa:"/briːð/", pos:"verb", level:1, vi:"thở, hít thở", examples:[{en:"Breathe slowly.", vi:"Hít thở chậm rãi."},{en:"It is hard to breathe here.", vi:"Ở đây khó thở."}]},
  {id:617, word:"bury", ipa:"/ˈberi/", pos:"verb", level:1, vi:"chôn, vùi", examples:[{en:"The dog buried the bone.", vi:"Con chó chôn cục xương."},{en:"They buried the treasure.", vi:"Họ chôn kho báu."}]},
  {id:618, word:"cancel", ipa:"/ˈkænsl/", pos:"verb", level:1, vi:"hủy, hủy bỏ", examples:[{en:"They canceled the flight.", vi:"Họ hủy chuyến bay."},{en:"I want to cancel my order.", vi:"Tôi muốn hủy đơn hàng."}]},
  {id:619, word:"chase", ipa:"/tʃeɪs/", pos:"verb", level:1, vi:"đuổi theo, rượt", examples:[{en:"The cat chased the mouse.", vi:"Con mèo đuổi theo con chuột."},{en:"The dog chased the ball.", vi:"Con chó đuổi theo quả bóng."}]},
  {id:620, word:"cheat", ipa:"/tʃiːt/", pos:"verb", level:1, vi:"gian lận, lừa dối", examples:[{en:"Don't cheat on the test.", vi:"Đừng gian lận trong bài thi."},{en:"He cheated in the game.", vi:"Anh ấy gian lận trong trò chơi."}]},
  {id:621, word:"celebrate", ipa:"/ˈseləbreɪt/", pos:"verb", level:1, vi:"ăn mừng, kỷ niệm", examples:[{en:"We celebrate her birthday today.", vi:"Hôm nay chúng tôi mừng sinh nhật cô ấy."},{en:"Let's celebrate!", vi:"Mình ăn mừng nào!"}]},
  {id:622, word:"compare", ipa:"/kəmˈper/", pos:"verb", level:1, vi:"so sánh", examples:[{en:"Compare these two pictures.", vi:"So sánh hai bức tranh này."},{en:"Don't compare yourself to others.", vi:"Đừng so sánh mình với người khác."}]},
  {id:623, word:"complain", ipa:"/kəmˈpleɪn/", pos:"verb", level:1, vi:"phàn nàn, than phiền", examples:[{en:"She complains about the weather.", vi:"Cô ấy than phiền về thời tiết."},{en:"Stop complaining, please.", vi:"Đừng phàn nàn nữa."}]},
  {id:624, word:"control", ipa:"/kənˈtroʊl/", pos:"verb", level:1, vi:"kiểm soát, điều khiển", examples:[{en:"Control your temper.", vi:"Hãy kiểm soát cơn nóng giận."},{en:"He controls the machine.", vi:"Anh ấy điều khiển cỗ máy."}]},
  {id:625, word:"copy", ipa:"/ˈkɑːpi/", pos:"verb", level:1, vi:"sao chép, chép lại", examples:[{en:"Copy this sentence.", vi:"Chép lại câu này."},{en:"Don't copy your friend's work.", vi:"Đừng chép bài của bạn."}]},
  {id:626, word:"create", ipa:"/kriˈeɪt/", pos:"verb", level:1, vi:"tạo ra, sáng tạo", examples:[{en:"She creates beautiful art.", vi:"Cô ấy sáng tạo ra những tác phẩm đẹp."},{en:"Let's create something new.", vi:"Mình tạo ra một thứ gì đó mới nhé."}]},
  {id:627, word:"cross", ipa:"/krɔːs/", pos:"verb", level:1, vi:"băng qua, vượt qua", examples:[{en:"Cross the road carefully.", vi:"Băng qua đường cẩn thận nhé."},{en:"We crossed the river by boat.", vi:"Chúng tôi qua sông bằng thuyền."}]},
  {id:628, word:"damage", ipa:"/ˈdæmɪdʒ/", pos:"verb", level:1, vi:"làm hư hại, gây hại", examples:[{en:"The storm damaged the house.", vi:"Cơn bão làm hư hại ngôi nhà."},{en:"Smoking damages your health.", vi:"Hút thuốc gây hại cho sức khỏe."}]},
  {id:629, word:"deliver", ipa:"/dɪˈlɪvər/", pos:"verb", level:1, vi:"giao, chuyển (hàng)", examples:[{en:"They deliver pizza to your door.", vi:"Họ giao pizza đến tận cửa."},{en:"The mail is delivered every day.", vi:"Thư được giao mỗi ngày."}]},
  {id:630, word:"deny", ipa:"/dɪˈnaɪ/", pos:"verb", level:1, vi:"phủ nhận, chối", examples:[{en:"He denied the story.", vi:"Anh ấy phủ nhận câu chuyện đó."},{en:"She can't deny the truth.", vi:"Cô ấy không thể chối sự thật."}]},
  {id:631, word:"design", ipa:"/dɪˈzaɪn/", pos:"verb", level:1, vi:"thiết kế", examples:[{en:"She designs clothes.", vi:"Cô ấy thiết kế quần áo."},{en:"They designed a new park.", vi:"Họ thiết kế một công viên mới."}]},
  {id:632, word:"destroy", ipa:"/dɪˈstrɔɪ/", pos:"verb", level:1, vi:"phá hủy, hủy diệt", examples:[{en:"The fire destroyed the building.", vi:"Đám cháy phá hủy tòa nhà."},{en:"War destroys everything.", vi:"Chiến tranh hủy diệt mọi thứ."}]},
  {id:633, word:"develop", ipa:"/dɪˈveləp/", pos:"verb", level:1, vi:"phát triển", examples:[{en:"The city is developing fast.", vi:"Thành phố đang phát triển nhanh."},{en:"Children develop quickly.", vi:"Trẻ em phát triển nhanh."}]},
  {id:634, word:"discover", ipa:"/dɪˈskʌvər/", pos:"verb", level:1, vi:"khám phá, phát hiện", examples:[{en:"They discovered a new island.", vi:"Họ khám phá một hòn đảo mới."},{en:"I discovered a great café.", vi:"Tôi phát hiện một quán cà phê tuyệt vời."}]},
  {id:635, word:"discuss", ipa:"/dɪˈskʌs/", pos:"verb", level:1, vi:"thảo luận, bàn bạc", examples:[{en:"Let's discuss the plan.", vi:"Mình thảo luận về kế hoạch nhé."},{en:"We discussed the problem.", vi:"Chúng tôi đã bàn về vấn đề đó."}]},
  {id:636, word:"divide", ipa:"/dɪˈvaɪd/", pos:"verb", level:1, vi:"chia, phân chia", examples:[{en:"Divide the cake into eight.", vi:"Chia cái bánh thành tám phần."},{en:"The river divides the city.", vi:"Dòng sông chia đôi thành phố."}]},
  {id:637, word:"earn", ipa:"/ɜːrn/", pos:"verb", level:1, vi:"kiếm (tiền); giành được", examples:[{en:"She earns a good salary.", vi:"Cô ấy kiếm được mức lương tốt."},{en:"He earned their respect.", vi:"Anh ấy giành được sự tôn trọng của họ."}]},
  {id:638, word:"escape", ipa:"/ɪˈskeɪp/", pos:"verb", level:1, vi:"trốn thoát, thoát ra", examples:[{en:"The bird escaped from the cage.", vi:"Con chim thoát ra khỏi lồng."},{en:"They escaped the fire.", vi:"Họ thoát khỏi đám cháy."}]},
  {id:639, word:"examine", ipa:"/ɪɡˈzæmɪn/", pos:"verb", level:1, vi:"kiểm tra, khám", examples:[{en:"The doctor examined the patient.", vi:"Bác sĩ khám cho bệnh nhân."},{en:"Examine the map closely.", vi:"Xem kỹ tấm bản đồ."}]},
  {id:640, word:"explore", ipa:"/ɪkˈsplɔːr/", pos:"verb", level:1, vi:"khám phá, thám hiểm", examples:[{en:"We explored the old town.", vi:"Chúng tôi khám phá phố cổ."},{en:"Let's explore the cave.", vi:"Mình thám hiểm hang động nhé."}]},
  {id:641, word:"fold", ipa:"/foʊld/", pos:"verb", level:1, vi:"gấp, gập", examples:[{en:"Fold the paper in half.", vi:"Gấp đôi tờ giấy."},{en:"She folded the clothes.", vi:"Cô ấy gấp quần áo."}]},
  {id:642, word:"forgive", ipa:"/fərˈɡɪv/", pos:"verb", level:1, vi:"tha thứ", examples:[{en:"Please forgive me.", vi:"Xin hãy tha thứ cho tôi."},{en:"She forgave her friend.", vi:"Cô ấy tha thứ cho bạn mình."}]},
  {id:643, word:"freeze", ipa:"/friːz/", pos:"verb", level:1, vi:"đông cứng, đóng băng", examples:[{en:"Water freezes at zero degrees.", vi:"Nước đóng băng ở không độ."},{en:"My hands are freezing.", vi:"Tay tôi lạnh cóng."}]},
  {id:644, word:"gather", ipa:"/ˈɡæðər/", pos:"verb", level:1, vi:"tụ họp, thu gom", examples:[{en:"The family gathered for dinner.", vi:"Cả nhà tụ họp ăn tối."},{en:"She gathered the leaves.", vi:"Cô ấy gom lá lại."}]},
  {id:645, word:"grab", ipa:"/ɡræb/", pos:"verb", level:1, vi:"chộp, nắm lấy", examples:[{en:"Grab my hand!", vi:"Nắm lấy tay tôi!"},{en:"He grabbed his bag and ran.", vi:"Anh ấy chộp lấy túi rồi chạy."}]},
  {id:646, word:"greet", ipa:"/ɡriːt/", pos:"verb", level:1, vi:"chào, chào đón", examples:[{en:"She greeted us with a smile.", vi:"Cô ấy chào chúng tôi bằng một nụ cười."},{en:"Greet your guests politely.", vi:"Hãy chào khách lịch sự."}]},
  {id:647, word:"hide", ipa:"/haɪd/", pos:"verb", level:1, vi:"trốn, giấu", examples:[{en:"The children hid behind the tree.", vi:"Bọn trẻ trốn sau cái cây."},{en:"She hid the gift.", vi:"Cô ấy giấu món quà."}]},
  {id:648, word:"hunt", ipa:"/hʌnt/", pos:"verb", level:1, vi:"săn, săn bắt", examples:[{en:"Lions hunt at night.", vi:"Sư tử săn mồi vào ban đêm."},{en:"They went to hunt for food.", vi:"Họ đi săn để kiếm thức ăn."}]},
  {id:649, word:"ignore", ipa:"/ɪɡˈnɔːr/", pos:"verb", level:1, vi:"phớt lờ, làm ngơ", examples:[{en:"Don't ignore my message.", vi:"Đừng phớt lờ tin nhắn của tôi."},{en:"She ignored the noise.", vi:"Cô ấy mặc kệ tiếng ồn."}]},
  {id:650, word:"invent", ipa:"/ɪnˈvent/", pos:"verb", level:1, vi:"phát minh, sáng chế", examples:[{en:"Who invented the phone?", vi:"Ai đã phát minh ra điện thoại?"},{en:"She invented a new game.", vi:"Cô ấy sáng tạo ra một trò chơi mới."}]},
  {id:651, word:"accident", ipa:"/ˈæksɪdənt/", pos:"noun", level:1, vi:"tai nạn; sự tình cờ", examples:[{en:"There was a car accident.", vi:"Có một vụ tai nạn ô tô."},{en:"I broke it by accident.", vi:"Tôi làm vỡ nó một cách vô tình."}]},
  {id:652, word:"account", ipa:"/əˈkaʊnt/", pos:"noun", level:1, vi:"tài khoản", examples:[{en:"I opened a bank account.", vi:"Tôi mở một tài khoản ngân hàng."},{en:"Check your email account.", vi:"Kiểm tra tài khoản email của bạn."}]},
  {id:653, word:"actor", ipa:"/ˈæktər/", pos:"noun", level:1, vi:"diễn viên (nam)", examples:[{en:"He is a famous actor.", vi:"Anh ấy là một diễn viên nổi tiếng."},{en:"The actor played a king.", vi:"Diễn viên đó đóng vai một vị vua."}]},
  {id:654, word:"address", ipa:"/əˈdres/", pos:"noun", level:1, vi:"địa chỉ", examples:[{en:"What is your address?", vi:"Địa chỉ của bạn là gì?"},{en:"Write your address here.", vi:"Viết địa chỉ của bạn vào đây."}]},
  {id:655, word:"adult", ipa:"/ˈædʌlt/", pos:"noun", level:1, vi:"người lớn, người trưởng thành", examples:[{en:"This film is for adults.", vi:"Bộ phim này dành cho người lớn."},{en:"An adult should help the child.", vi:"Một người lớn nên giúp đứa trẻ."}]},
  {id:656, word:"advice", ipa:"/ədˈvaɪs/", pos:"noun", level:1, vi:"lời khuyên", examples:[{en:"Thank you for your advice.", vi:"Cảm ơn vì lời khuyên của bạn."},{en:"Can I ask for some advice?", vi:"Tôi xin một lời khuyên được không?"}]},
  {id:657, word:"airport", ipa:"/ˈerpɔːrt/", pos:"noun", level:1, vi:"sân bay", examples:[{en:"The airport is far from here.", vi:"Sân bay ở xa đây."},{en:"We met at the airport.", vi:"Chúng tôi gặp nhau ở sân bay."}]},
  {id:658, word:"ant", ipa:"/ænt/", pos:"noun", level:1, vi:"con kiến", examples:[{en:"There are ants on the table.", vi:"Có kiến trên bàn."},{en:"Ants are very small.", vi:"Kiến rất nhỏ."}]},
  {id:659, word:"apartment", ipa:"/əˈpɑːrtmənt/", pos:"noun", level:1, vi:"căn hộ", examples:[{en:"They live in a small apartment.", vi:"Họ sống trong một căn hộ nhỏ."},{en:"My apartment is on the fifth floor.", vi:"Căn hộ của tôi ở tầng năm."}]},
  {id:660, word:"arm", ipa:"/ɑːrm/", pos:"noun", level:1, vi:"cánh tay", examples:[{en:"She broke her arm.", vi:"Cô ấy bị gãy tay."},{en:"He held the baby in his arms.", vi:"Anh ấy bế em bé trong vòng tay."}]},
  {id:661, word:"army", ipa:"/ˈɑːrmi/", pos:"noun", level:1, vi:"quân đội", examples:[{en:"He joined the army.", vi:"Anh ấy gia nhập quân đội."},{en:"The army is very large.", vi:"Quân đội rất đông."}]},
  {id:662, word:"arrow", ipa:"/ˈæroʊ/", pos:"noun", level:1, vi:"mũi tên", examples:[{en:"Follow the arrow.", vi:"Đi theo mũi tên."},{en:"He shot an arrow.", vi:"Anh ấy bắn một mũi tên."}]},
  {id:663, word:"aunt", ipa:"/ænt/", pos:"noun", level:1, vi:"cô, dì, bác gái", examples:[{en:"My aunt lives in Hue.", vi:"Cô tôi sống ở Huế."},{en:"We visited our aunt.", vi:"Chúng tôi đến thăm dì."}]},
  {id:664, word:"author", ipa:"/ˈɔːθər/", pos:"noun", level:1, vi:"tác giả", examples:[{en:"Who is the author of this book?", vi:"Ai là tác giả của cuốn sách này?"},{en:"She is a famous author.", vi:"Cô ấy là một tác giả nổi tiếng."}]},
  {id:665, word:"balloon", ipa:"/bəˈluːn/", pos:"noun", level:1, vi:"quả bóng bay", examples:[{en:"The child has a red balloon.", vi:"Đứa trẻ có một quả bóng bay đỏ."},{en:"The balloons are flying away.", vi:"Những quả bóng bay đang bay đi."}]},
  {id:666, word:"banana", ipa:"/bəˈnænə/", pos:"noun", level:1, vi:"quả chuối", examples:[{en:"I eat a banana every morning.", vi:"Tôi ăn một quả chuối mỗi sáng."},{en:"Monkeys love bananas.", vi:"Khỉ thích chuối."}]},
  {id:667, word:"basket", ipa:"/ˈbæskɪt/", pos:"noun", level:1, vi:"cái giỏ, rổ", examples:[{en:"The basket is full of fruit.", vi:"Cái giỏ đầy trái cây."},{en:"Put the eggs in the basket.", vi:"Bỏ trứng vào giỏ."}]},
  {id:668, word:"bean", ipa:"/biːn/", pos:"noun", level:1, vi:"hạt đậu", examples:[{en:"I like green beans.", vi:"Tôi thích đậu xanh (đậu que)."},{en:"Beans are good for you.", vi:"Đậu tốt cho bạn."}]},
  {id:669, word:"bear", ipa:"/ber/", pos:"noun", level:1, vi:"con gấu", examples:[{en:"A bear lives in the forest.", vi:"Một con gấu sống trong rừng."},{en:"The bear is very big.", vi:"Con gấu rất to."}]},
  {id:670, word:"bee", ipa:"/biː/", pos:"noun", level:1, vi:"con ong", examples:[{en:"Bees make honey.", vi:"Ong làm ra mật."},{en:"A bee landed on the flower.", vi:"Một con ong đậu trên bông hoa."}]},
  {id:671, word:"beef", ipa:"/biːf/", pos:"noun", level:1, vi:"thịt bò", examples:[{en:"We had beef for dinner.", vi:"Chúng tôi ăn thịt bò vào bữa tối."},{en:"This beef is very tender.", vi:"Thịt bò này rất mềm."}]},
  {id:672, word:"belt", ipa:"/belt/", pos:"noun", level:1, vi:"thắt lưng, dây nịt", examples:[{en:"He wears a brown belt.", vi:"Anh ấy đeo một chiếc thắt lưng nâu."},{en:"Fasten your seat belt.", vi:"Thắt dây an toàn vào."}]},
  {id:673, word:"bench", ipa:"/bentʃ/", pos:"noun", level:1, vi:"ghế dài (băng ghế)", examples:[{en:"We sat on a bench in the park.", vi:"Chúng tôi ngồi trên băng ghế trong công viên."},{en:"The bench is wet.", vi:"Cái băng ghế bị ướt."}]},
  {id:674, word:"blanket", ipa:"/ˈblæŋkɪt/", pos:"noun", level:1, vi:"cái chăn, mền", examples:[{en:"Cover the baby with a blanket.", vi:"Đắp chăn cho em bé."},{en:"This blanket is warm.", vi:"Cái chăn này ấm."}]},
  {id:675, word:"bowl", ipa:"/boʊl/", pos:"noun", level:1, vi:"cái bát, tô", examples:[{en:"A bowl of rice, please.", vi:"Cho tôi một bát cơm."},{en:"The bowl is full of soup.", vi:"Cái tô đầy súp."}]},
  {id:676, word:"brain", ipa:"/breɪn/", pos:"noun", level:1, vi:"bộ não", examples:[{en:"The brain controls the body.", vi:"Bộ não điều khiển cơ thể."},{en:"Use your brain!", vi:"Hãy dùng cái đầu của bạn!"}]},
  {id:677, word:"branch", ipa:"/bræntʃ/", pos:"noun", level:1, vi:"cành cây; chi nhánh", examples:[{en:"A bird sat on a branch.", vi:"Một con chim đậu trên cành cây."},{en:"The bank has many branches.", vi:"Ngân hàng có nhiều chi nhánh."}]},
  {id:678, word:"brick", ipa:"/brɪk/", pos:"noun", level:1, vi:"viên gạch", examples:[{en:"The wall is made of bricks.", vi:"Bức tường được xây bằng gạch."},{en:"He carried a heavy brick.", vi:"Anh ấy mang một viên gạch nặng."}]},
  {id:679, word:"bucket", ipa:"/ˈbʌkɪt/", pos:"noun", level:1, vi:"cái xô", examples:[{en:"Fill the bucket with water.", vi:"Đổ đầy nước vào xô."},{en:"The bucket is empty.", vi:"Cái xô rỗng."}]},
  {id:680, word:"butter", ipa:"/ˈbʌtər/", pos:"noun", level:1, vi:"bơ", examples:[{en:"I put butter on my bread.", vi:"Tôi phết bơ lên bánh mì."},{en:"The butter is in the fridge.", vi:"Bơ ở trong tủ lạnh."}]},
  {id:681, word:"butterfly", ipa:"/ˈbʌtərflaɪ/", pos:"noun", level:1, vi:"con bướm", examples:[{en:"A butterfly landed on the flower.", vi:"Một con bướm đậu lên bông hoa."},{en:"Butterflies are colorful.", vi:"Những con bướm đầy màu sắc."}]},
  {id:682, word:"cabbage", ipa:"/ˈkæbɪdʒ/", pos:"noun", level:1, vi:"bắp cải", examples:[{en:"I bought a cabbage at the market.", vi:"Tôi mua một cây bắp cải ở chợ."},{en:"Cabbage is a healthy vegetable.", vi:"Bắp cải là một loại rau tốt cho sức khỏe."}]},
  {id:683, word:"camera", ipa:"/ˈkæmrə/", pos:"noun", level:1, vi:"máy ảnh", examples:[{en:"She bought a new camera.", vi:"Cô ấy mua một chiếc máy ảnh mới."},{en:"Smile for the camera!", vi:"Cười lên trước máy ảnh nào!"}]},
  {id:684, word:"candle", ipa:"/ˈkændl/", pos:"noun", level:1, vi:"cây nến", examples:[{en:"Light the candle, please.", vi:"Thắp nến lên nhé."},{en:"There are ten candles on the cake.", vi:"Có mười cây nến trên bánh."}]},
  {id:685, word:"candy", ipa:"/ˈkændi/", pos:"noun", level:1, vi:"kẹo", examples:[{en:"Children love candy.", vi:"Trẻ con thích kẹo."},{en:"Don't eat too much candy.", vi:"Đừng ăn quá nhiều kẹo."}]},
  {id:686, word:"cap", ipa:"/kæp/", pos:"noun", level:1, vi:"mũ lưỡi trai; nắp", examples:[{en:"He wears a blue cap.", vi:"Anh ấy đội một chiếc mũ lưỡi trai xanh."},{en:"Put the cap back on the bottle.", vi:"Đậy nắp chai lại."}]},
  {id:687, word:"captain", ipa:"/ˈkæptɪn/", pos:"noun", level:1, vi:"đội trưởng; thuyền trưởng", examples:[{en:"He is the captain of the team.", vi:"Anh ấy là đội trưởng của đội."},{en:"The captain steered the ship.", vi:"Thuyền trưởng lái con tàu."}]},
  {id:688, word:"carpet", ipa:"/ˈkɑːrpɪt/", pos:"noun", level:1, vi:"tấm thảm", examples:[{en:"The carpet is soft.", vi:"Tấm thảm mềm mại."},{en:"There is a red carpet in the hall.", vi:"Có một tấm thảm đỏ trong sảnh."}]},
  {id:689, word:"carrot", ipa:"/ˈkærət/", pos:"noun", level:1, vi:"củ cà rốt", examples:[{en:"Rabbits like carrots.", vi:"Thỏ thích cà rốt."},{en:"Add some carrots to the soup.", vi:"Thêm chút cà rốt vào súp."}]},
  {id:690, word:"castle", ipa:"/ˈkæsl/", pos:"noun", level:1, vi:"lâu đài", examples:[{en:"The king lives in a castle.", vi:"Nhà vua sống trong một lâu đài."},{en:"The old castle is on the hill.", vi:"Lâu đài cổ nằm trên đồi."}]},
  {id:691, word:"cave", ipa:"/keɪv/", pos:"noun", level:1, vi:"hang động", examples:[{en:"Bats live in the cave.", vi:"Dơi sống trong hang."},{en:"We explored a dark cave.", vi:"Chúng tôi khám phá một hang động tối."}]},
  {id:692, word:"century", ipa:"/ˈsentʃəri/", pos:"noun", level:1, vi:"thế kỷ", examples:[{en:"This castle is a century old.", vi:"Lâu đài này có tuổi đời một thế kỷ."},{en:"We live in the twenty-first century.", vi:"Chúng ta sống ở thế kỷ hai mươi mốt."}]},
  {id:693, word:"chain", ipa:"/tʃeɪn/", pos:"noun", level:1, vi:"dây xích, chuỗi", examples:[{en:"The dog is on a chain.", vi:"Con chó bị xích lại."},{en:"She wears a gold chain.", vi:"Cô ấy đeo một sợi dây chuyền vàng."}]},
  {id:694, word:"cheek", ipa:"/tʃiːk/", pos:"noun", level:1, vi:"má", examples:[{en:"The baby has soft cheeks.", vi:"Em bé có đôi má mềm mại."},{en:"She kissed my cheek.", vi:"Cô ấy hôn lên má tôi."}]},
  {id:695, word:"chest", ipa:"/tʃest/", pos:"noun", level:1, vi:"ngực; rương, hòm", examples:[{en:"He has a pain in his chest.", vi:"Anh ấy bị đau ngực."},{en:"The gold is in the chest.", vi:"Vàng nằm trong cái rương."}]},
  {id:696, word:"chief", ipa:"/tʃiːf/", pos:"noun", level:1, vi:"thủ lĩnh, người đứng đầu", examples:[{en:"He is the chief of the village.", vi:"Ông ấy là người đứng đầu làng."},{en:"The chief made a decision.", vi:"Vị thủ lĩnh đưa ra quyết định."}]},
  {id:697, word:"chimney", ipa:"/ˈtʃɪmni/", pos:"noun", level:1, vi:"ống khói", examples:[{en:"Smoke comes out of the chimney.", vi:"Khói bốc ra từ ống khói."},{en:"The house has a tall chimney.", vi:"Ngôi nhà có một ống khói cao."}]},
  {id:698, word:"chin", ipa:"/tʃɪn/", pos:"noun", level:1, vi:"cằm", examples:[{en:"He has a small chin.", vi:"Anh ấy có cái cằm nhỏ."},{en:"Lift your chin up.", vi:"Ngẩng cằm lên."}]},
  {id:699, word:"chocolate", ipa:"/ˈtʃɑːklət/", pos:"noun", level:1, vi:"sô-cô-la", examples:[{en:"I love dark chocolate.", vi:"Tôi thích sô-cô-la đen."},{en:"She gave me a box of chocolate.", vi:"Cô ấy tặng tôi một hộp sô-cô-la."}]},
  {id:700, word:"citizen", ipa:"/ˈsɪtɪzn/", pos:"noun", level:1, vi:"công dân", examples:[{en:"He is a citizen of Vietnam.", vi:"Anh ấy là công dân Việt Nam."},{en:"Every citizen has rights.", vi:"Mỗi công dân đều có quyền lợi."}]},
  {id:701, word:"cliff", ipa:"/klɪf/", pos:"noun", level:1, vi:"vách đá, vực đá", examples:[{en:"The house is near a cliff.", vi:"Ngôi nhà ở gần một vách đá."},{en:"Don't stand close to the cliff.", vi:"Đừng đứng sát mép vực."}]},
  {id:702, word:"cloth", ipa:"/klɔːθ/", pos:"noun", level:1, vi:"vải; miếng giẻ", examples:[{en:"Clean the table with a cloth.", vi:"Lau bàn bằng một miếng giẻ."},{en:"This cloth is very soft.", vi:"Tấm vải này rất mềm."}]},
  {id:703, word:"coast", ipa:"/koʊst/", pos:"noun", level:1, vi:"bờ biển, ven biển", examples:[{en:"They live on the coast.", vi:"Họ sống ở vùng ven biển."},{en:"The coast is beautiful at sunset.", vi:"Bờ biển đẹp vào lúc hoàng hôn."}]},
  {id:704, word:"coat", ipa:"/koʊt/", pos:"noun", level:1, vi:"áo khoác", examples:[{en:"Wear a warm coat.", vi:"Mặc một chiếc áo khoác ấm."},{en:"She hung her coat on the door.", vi:"Cô ấy treo áo khoác lên cửa."}]},
  {id:705, word:"coin", ipa:"/kɔɪn/", pos:"noun", level:1, vi:"đồng xu", examples:[{en:"I found a coin on the floor.", vi:"Tôi nhặt được một đồng xu trên sàn."},{en:"He collects old coins.", vi:"Anh ấy sưu tầm tiền xu cổ."}]},
  {id:706, word:"corn", ipa:"/kɔːrn/", pos:"noun", level:1, vi:"ngô, bắp", examples:[{en:"We grow corn on the farm.", vi:"Chúng tôi trồng ngô ở nông trại."},{en:"I like sweet corn.", vi:"Tôi thích bắp ngọt."}]},
  {id:707, word:"cottage", ipa:"/ˈkɑːtɪdʒ/", pos:"noun", level:1, vi:"nhà tranh, nhà nhỏ ở quê", examples:[{en:"They have a cottage by the lake.", vi:"Họ có một căn nhà nhỏ bên hồ."},{en:"The cottage looks cozy.", vi:"Căn nhà nhỏ trông ấm cúng."}]},
  {id:708, word:"couple", ipa:"/ˈkʌpl/", pos:"noun", level:1, vi:"cặp đôi; một vài", examples:[{en:"They are a happy couple.", vi:"Họ là một cặp đôi hạnh phúc."},{en:"I'll be back in a couple of days.", vi:"Tôi sẽ quay lại sau vài ngày nữa."}]},
  {id:709, word:"cousin", ipa:"/ˈkʌzn/", pos:"noun", level:1, vi:"anh/chị/em họ", examples:[{en:"My cousin lives nearby.", vi:"Anh họ tôi sống gần đây."},{en:"I have many cousins.", vi:"Tôi có nhiều anh chị em họ."}]},
  {id:710, word:"cream", ipa:"/kriːm/", pos:"noun", level:1, vi:"kem (sữa); kem bôi", examples:[{en:"I like cream in my coffee.", vi:"Tôi thích cho kem vào cà phê."},{en:"Put some cream on your hands.", vi:"Bôi chút kem lên tay đi."}]},
  {id:711, word:"crime", ipa:"/kraɪm/", pos:"noun", level:1, vi:"tội phạm, tội ác", examples:[{en:"Stealing is a crime.", vi:"Trộm cắp là một tội."},{en:"The city has little crime.", vi:"Thành phố ít tội phạm."}]},
  {id:712, word:"crown", ipa:"/kraʊn/", pos:"noun", level:1, vi:"vương miện", examples:[{en:"The queen wears a crown.", vi:"Nữ hoàng đội vương miện."},{en:"The crown is made of gold.", vi:"Chiếc vương miện làm bằng vàng."}]},
  {id:713, word:"cucumber", ipa:"/ˈkjuːkʌmbər/", pos:"noun", level:1, vi:"quả dưa chuột", examples:[{en:"Add cucumber to the salad.", vi:"Thêm dưa chuột vào món salad."},{en:"Cucumbers are fresh and cool.", vi:"Dưa chuột tươi và mát."}]},
  {id:714, word:"curtain", ipa:"/ˈkɜːrtn/", pos:"noun", level:1, vi:"tấm rèm, màn", examples:[{en:"Please close the curtains.", vi:"Vui lòng kéo rèm lại."},{en:"The curtains are light blue.", vi:"Những tấm rèm màu xanh nhạt."}]},
  {id:715, word:"deer", ipa:"/dɪr/", pos:"noun", level:1, vi:"con hươu, nai", examples:[{en:"A deer ran across the road.", vi:"Một con hươu chạy băng qua đường."},{en:"Deer live in the forest.", vi:"Hươu sống trong rừng."}]},
  {id:716, word:"dentist", ipa:"/ˈdentɪst/", pos:"noun", level:1, vi:"nha sĩ", examples:[{en:"I have a dentist appointment.", vi:"Tôi có hẹn với nha sĩ."},{en:"The dentist checked my teeth.", vi:"Nha sĩ kiểm tra răng cho tôi."}]},
  {id:717, word:"desert", ipa:"/ˈdezərt/", pos:"noun", level:1, vi:"sa mạc", examples:[{en:"The desert is hot and dry.", vi:"Sa mạc nóng và khô."},{en:"Camels live in the desert.", vi:"Lạc đà sống ở sa mạc."}]},
  {id:718, word:"dessert", ipa:"/dɪˈzɜːrt/", pos:"noun", level:1, vi:"món tráng miệng", examples:[{en:"What's for dessert?", vi:"Món tráng miệng là gì?"},{en:"We had ice cream for dessert.", vi:"Chúng tôi ăn kem tráng miệng."}]},
  {id:719, word:"diamond", ipa:"/ˈdaɪmənd/", pos:"noun", level:1, vi:"kim cương", examples:[{en:"The ring has a small diamond.", vi:"Chiếc nhẫn có một viên kim cương nhỏ."},{en:"Diamonds are very expensive.", vi:"Kim cương rất đắt."}]},
  {id:720, word:"dictionary", ipa:"/ˈdɪkʃəneri/", pos:"noun", level:1, vi:"từ điển", examples:[{en:"Look it up in the dictionary.", vi:"Tra từ đó trong từ điển."},{en:"I have an English dictionary.", vi:"Tôi có một cuốn từ điển tiếng Anh."}]},
  {id:721, word:"dinosaur", ipa:"/ˈdaɪnəsɔːr/", pos:"noun", level:1, vi:"khủng long", examples:[{en:"Dinosaurs lived long ago.", vi:"Khủng long sống từ rất lâu trước đây."},{en:"The boy loves dinosaurs.", vi:"Cậu bé thích khủng long."}]},
  {id:722, word:"dish", ipa:"/dɪʃ/", pos:"noun", level:1, vi:"cái đĩa; món ăn", examples:[{en:"Please wash the dishes.", vi:"Vui lòng rửa bát đĩa."},{en:"This is my favorite dish.", vi:"Đây là món ăn tôi thích nhất."}]},
  {id:723, word:"distance", ipa:"/ˈdɪstəns/", pos:"noun", level:1, vi:"khoảng cách", examples:[{en:"What is the distance to the city?", vi:"Khoảng cách đến thành phố là bao nhiêu?"},{en:"I saw her in the distance.", vi:"Tôi thấy cô ấy ở đằng xa."}]},
  {id:724, word:"doll", ipa:"/dɑːl/", pos:"noun", level:1, vi:"búp bê", examples:[{en:"The girl plays with her doll.", vi:"Cô bé chơi với búp bê."},{en:"This doll has blue eyes.", vi:"Con búp bê này có đôi mắt xanh."}]},
  {id:725, word:"dolphin", ipa:"/ˈdɑːlfɪn/", pos:"noun", level:1, vi:"cá heo", examples:[{en:"Dolphins are very smart.", vi:"Cá heo rất thông minh."},{en:"We saw dolphins in the sea.", vi:"Chúng tôi thấy cá heo ngoài biển."}]},
  {id:726, word:"donkey", ipa:"/ˈdɑːŋki/", pos:"noun", level:1, vi:"con lừa", examples:[{en:"The donkey carried the bags.", vi:"Con lừa chở những bao đồ."},{en:"A donkey is like a small horse.", vi:"Con lừa giống một con ngựa nhỏ."}]},
  {id:727, word:"dragon", ipa:"/ˈdræɡən/", pos:"noun", level:1, vi:"con rồng", examples:[{en:"The story is about a dragon.", vi:"Câu chuyện kể về một con rồng."},{en:"Dragons appear in many tales.", vi:"Rồng xuất hiện trong nhiều câu chuyện."}]},
  {id:728, word:"drawer", ipa:"/drɔːr/", pos:"noun", level:1, vi:"ngăn kéo", examples:[{en:"The socks are in the drawer.", vi:"Tất ở trong ngăn kéo."},{en:"Open the top drawer.", vi:"Mở ngăn kéo trên cùng."}]},
  {id:729, word:"drum", ipa:"/drʌm/", pos:"noun", level:1, vi:"cái trống", examples:[{en:"He plays the drums.", vi:"Anh ấy chơi trống."},{en:"The drum is very loud.", vi:"Cái trống kêu rất to."}]},
  {id:730, word:"dust", ipa:"/dʌst/", pos:"noun", level:1, vi:"bụi", examples:[{en:"There is dust on the table.", vi:"Có bụi trên bàn."},{en:"The room is full of dust.", vi:"Căn phòng đầy bụi."}]},
  {id:731, word:"absent", ipa:"/ˈæbsənt/", pos:"adjective", level:1, vi:"vắng mặt", examples:[{en:"He was absent from school today.", vi:"Hôm nay cậu ấy nghỉ học."},{en:"Two students are absent.", vi:"Hai học sinh vắng mặt."}]},
  {id:732, word:"active", ipa:"/ˈæktɪv/", pos:"adjective", level:1, vi:"năng động, hoạt bát", examples:[{en:"She is a very active child.", vi:"Cô bé rất hiếu động."},{en:"Stay active and healthy.", vi:"Hãy năng động và khỏe mạnh."}]},
  {id:733, word:"amazing", ipa:"/əˈmeɪzɪŋ/", pos:"adjective", level:1, vi:"tuyệt vời, kinh ngạc", examples:[{en:"The view is amazing.", vi:"Cảnh đẹp đến kinh ngạc."},{en:"What an amazing story!", vi:"Một câu chuyện thật tuyệt vời!"}]},
  {id:734, word:"anxious", ipa:"/ˈæŋkʃəs/", pos:"adjective", level:1, vi:"lo lắng, bồn chồn", examples:[{en:"She felt anxious before the exam.", vi:"Cô ấy lo lắng trước kỳ thi."},{en:"Don't be anxious, it's fine.", vi:"Đừng lo lắng, ổn cả mà."}]},
  {id:735, word:"asleep", ipa:"/əˈsliːp/", pos:"adjective", level:1, vi:"đang ngủ, ngủ say", examples:[{en:"The baby is asleep.", vi:"Em bé đang ngủ."},{en:"He fell asleep on the sofa.", vi:"Anh ấy ngủ thiếp đi trên ghế."}]},
  {id:736, word:"available", ipa:"/əˈveɪləbl/", pos:"adjective", level:1, vi:"có sẵn, rảnh (thời gian)", examples:[{en:"Is this seat available?", vi:"Chỗ này còn trống không?"},{en:"Are you available tomorrow?", vi:"Mai bạn có rảnh không?"}]},
  {id:737, word:"average", ipa:"/ˈævərɪdʒ/", pos:"adjective", level:1, vi:"trung bình, bình thường", examples:[{en:"He is of average height.", vi:"Anh ấy có chiều cao trung bình."},{en:"It was an average day.", vi:"Đó là một ngày bình thường."}]},
  {id:738, word:"awake", ipa:"/əˈweɪk/", pos:"adjective", level:1, vi:"thức, tỉnh táo", examples:[{en:"Are you still awake?", vi:"Bạn vẫn còn thức à?"},{en:"I stayed awake all night.", vi:"Tôi thức cả đêm."}]},
  {id:739, word:"awful", ipa:"/ˈɔːfl/", pos:"adjective", level:1, vi:"tồi tệ, kinh khủng", examples:[{en:"The weather is awful today.", vi:"Hôm nay thời tiết tồi tệ."},{en:"That smell is awful.", vi:"Cái mùi đó thật kinh khủng."}]},
  {id:740, word:"basic", ipa:"/ˈbeɪsɪk/", pos:"adjective", level:1, vi:"cơ bản", examples:[{en:"These are basic rules.", vi:"Đây là những quy tắc cơ bản."},{en:"I have basic English skills.", vi:"Tôi có kỹ năng tiếng Anh cơ bản."}]},
  {id:741, word:"bitter", ipa:"/ˈbɪtər/", pos:"adjective", level:1, vi:"đắng", examples:[{en:"This coffee is too bitter.", vi:"Cà phê này đắng quá."},{en:"The medicine tastes bitter.", vi:"Thuốc có vị đắng."}]},
  {id:742, word:"blank", ipa:"/blæŋk/", pos:"adjective", level:1, vi:"trống, để trống", examples:[{en:"Leave this line blank.", vi:"Để trống dòng này."},{en:"The page is blank.", vi:"Trang giấy trống trơn."}]},
  {id:743, word:"blind", ipa:"/blaɪnd/", pos:"adjective", level:1, vi:"mù, khiếm thị", examples:[{en:"The old man is blind.", vi:"Ông cụ bị mù."},{en:"A blind dog needs care.", vi:"Một chú chó mù cần được chăm sóc."}]},
  {id:744, word:"bored", ipa:"/bɔːrd/", pos:"adjective", level:1, vi:"chán, buồn chán", examples:[{en:"I am bored at home.", vi:"Tôi thấy chán khi ở nhà."},{en:"The children look bored.", vi:"Bọn trẻ trông có vẻ chán."}]},
  {id:745, word:"brief", ipa:"/briːf/", pos:"adjective", level:1, vi:"ngắn gọn, vắn tắt", examples:[{en:"Please be brief.", vi:"Vui lòng nói ngắn gọn."},{en:"It was a brief meeting.", vi:"Đó là một cuộc họp ngắn."}]},
  {id:746, word:"brilliant", ipa:"/ˈbrɪliənt/", pos:"adjective", level:1, vi:"xuất sắc, tài giỏi; rực rỡ", examples:[{en:"That's a brilliant idea!", vi:"Đó là một ý tưởng xuất sắc!"},{en:"She is a brilliant student.", vi:"Cô ấy là một học sinh tài giỏi."}]},
  {id:747, word:"broad", ipa:"/brɔːd/", pos:"adjective", level:1, vi:"rộng, rộng lớn", examples:[{en:"He has broad shoulders.", vi:"Anh ấy có đôi vai rộng."},{en:"It is a broad river.", vi:"Đó là một con sông rộng."}]},
  {id:748, word:"broken", ipa:"/ˈbroʊkən/", pos:"adjective", level:1, vi:"bị vỡ, bị hỏng", examples:[{en:"The window is broken.", vi:"Cửa sổ bị vỡ."},{en:"My phone is broken.", vi:"Điện thoại của tôi bị hỏng."}]},
  {id:749, word:"careless", ipa:"/ˈkerləs/", pos:"adjective", level:1, vi:"bất cẩn, cẩu thả", examples:[{en:"That was a careless mistake.", vi:"Đó là một lỗi do bất cẩn."},{en:"Don't be careless with money.", vi:"Đừng cẩu thả với tiền bạc."}]},
  {id:750, word:"central", ipa:"/ˈsentrəl/", pos:"adjective", level:1, vi:"trung tâm, ở giữa", examples:[{en:"The hotel is in a central area.", vi:"Khách sạn ở khu vực trung tâm."},{en:"This is the central station.", vi:"Đây là nhà ga trung tâm."}]},
  {id:751, word:"cheerful", ipa:"/ˈtʃɪrfl/", pos:"adjective", level:1, vi:"vui vẻ, vui tươi", examples:[{en:"She has a cheerful smile.", vi:"Cô ấy có một nụ cười vui tươi."},{en:"He is always cheerful.", vi:"Anh ấy lúc nào cũng vui vẻ."}]},
  {id:752, word:"clever", ipa:"/ˈklevər/", pos:"adjective", level:1, vi:"thông minh, khéo léo", examples:[{en:"She is a clever girl.", vi:"Cô bé rất thông minh."},{en:"That's a clever trick.", vi:"Đó là một mẹo khéo léo."}]},
  {id:753, word:"cloudy", ipa:"/ˈklaʊdi/", pos:"adjective", level:1, vi:"nhiều mây, u ám", examples:[{en:"It is cloudy today.", vi:"Hôm nay trời nhiều mây."},{en:"The sky looks cloudy.", vi:"Bầu trời trông u ám."}]},
  {id:754, word:"colorful", ipa:"/ˈkʌlərfl/", pos:"adjective", level:1, vi:"đầy màu sắc, sặc sỡ", examples:[{en:"The market is colorful.", vi:"Khu chợ đầy màu sắc."},{en:"She wore a colorful dress.", vi:"Cô ấy mặc một chiếc váy sặc sỡ."}]},
  {id:755, word:"confident", ipa:"/ˈkɑːnfɪdənt/", pos:"adjective", level:1, vi:"tự tin", examples:[{en:"She is confident on stage.", vi:"Cô ấy tự tin trên sân khấu."},{en:"Be confident in yourself.", vi:"Hãy tự tin vào bản thân."}]},
  {id:756, word:"confused", ipa:"/kənˈfjuːzd/", pos:"adjective", level:1, vi:"bối rối, lúng túng", examples:[{en:"I am confused by this map.", vi:"Tôi bối rối với tấm bản đồ này."},{en:"She looked confused.", vi:"Cô ấy trông có vẻ lúng túng."}]},
  {id:757, word:"cruel", ipa:"/ˈkruːəl/", pos:"adjective", level:1, vi:"tàn nhẫn, độc ác", examples:[{en:"It is cruel to hurt animals.", vi:"Làm đau động vật là tàn nhẫn."},{en:"The king was cruel.", vi:"Vị vua đó rất độc ác."}]},
  {id:758, word:"curious", ipa:"/ˈkjʊriəs/", pos:"adjective", level:1, vi:"tò mò, hiếu kỳ", examples:[{en:"Children are naturally curious.", vi:"Trẻ con vốn tò mò."},{en:"I am curious about your trip.", vi:"Tôi tò mò về chuyến đi của bạn."}]},
  {id:759, word:"cute", ipa:"/kjuːt/", pos:"adjective", level:1, vi:"dễ thương, đáng yêu", examples:[{en:"What a cute puppy!", vi:"Chú cún dễ thương quá!"},{en:"The baby is so cute.", vi:"Em bé đáng yêu quá."}]},
  {id:760, word:"daily", ipa:"/ˈdeɪli/", pos:"adjective / adverb", level:1, vi:"hằng ngày, mỗi ngày", examples:[{en:"This is my daily routine.", vi:"Đây là thói quen hằng ngày của tôi."},{en:"I exercise daily.", vi:"Tôi tập thể dục mỗi ngày."}]},
  {id:761, word:"deaf", ipa:"/def/", pos:"adjective", level:1, vi:"điếc, khiếm thính", examples:[{en:"Her grandfather is deaf.", vi:"Ông của cô ấy bị điếc."},{en:"He is deaf in one ear.", vi:"Anh ấy bị điếc một bên tai."}]},
  {id:762, word:"dear", ipa:"/dɪr/", pos:"adjective", level:1, vi:"thân mến, yêu quý", examples:[{en:"Dear friend, thank you.", vi:"Bạn thân mến, cảm ơn bạn."},{en:"She is a dear friend of mine.", vi:"Cô ấy là một người bạn thân của tôi."}]},
  {id:763, word:"dense", ipa:"/dens/", pos:"adjective", level:1, vi:"dày đặc, rậm rạp", examples:[{en:"The forest is very dense.", vi:"Khu rừng rất rậm rạp."},{en:"There is dense fog tonight.", vi:"Tối nay sương mù dày đặc."}]},
  {id:764, word:"digital", ipa:"/ˈdɪdʒɪtl/", pos:"adjective", level:1, vi:"kỹ thuật số, điện tử", examples:[{en:"I bought a digital clock.", vi:"Tôi mua một chiếc đồng hồ điện tử."},{en:"We live in a digital world.", vi:"Chúng ta sống trong thế giới kỹ thuật số."}]},
  {id:765, word:"dizzy", ipa:"/ˈdɪzi/", pos:"adjective", level:1, vi:"chóng mặt", examples:[{en:"I feel dizzy.", vi:"Tôi thấy chóng mặt."},{en:"The ride made her dizzy.", vi:"Trò chơi làm cô ấy chóng mặt."}]},
  {id:766, word:"double", ipa:"/ˈdʌbl/", pos:"adjective", level:1, vi:"đôi, gấp đôi", examples:[{en:"I'd like a double room.", vi:"Tôi muốn một phòng đôi."},{en:"The price is double now.", vi:"Bây giờ giá đã gấp đôi."}]},
  {id:767, word:"dull", ipa:"/dʌl/", pos:"adjective", level:1, vi:"buồn tẻ, chán; cùn", examples:[{en:"The movie was dull.", vi:"Bộ phim thật buồn tẻ."},{en:"This knife is dull.", vi:"Con dao này cùn."}]},
  {id:768, word:"dusty", ipa:"/ˈdʌsti/", pos:"adjective", level:1, vi:"đầy bụi, bám bụi", examples:[{en:"The old books are dusty.", vi:"Những cuốn sách cũ đầy bụi."},{en:"The road is dry and dusty.", vi:"Con đường khô và đầy bụi."}]},
  {id:769, word:"eager", ipa:"/ˈiːɡər/", pos:"adjective", level:1, vi:"hăm hở, háo hức", examples:[{en:"The students are eager to learn.", vi:"Học sinh háo hức học hỏi."},{en:"She is eager to start.", vi:"Cô ấy hăm hở muốn bắt đầu."}]},
  {id:770, word:"elegant", ipa:"/ˈelɪɡənt/", pos:"adjective", level:1, vi:"thanh lịch, tao nhã", examples:[{en:"She wore an elegant dress.", vi:"Cô ấy mặc một chiếc váy thanh lịch."},{en:"The room has an elegant style.", vi:"Căn phòng có phong cách tao nhã."}]},
  {id:771, word:"enormous", ipa:"/ɪˈnɔːrməs/", pos:"adjective", level:1, vi:"khổng lồ, to lớn", examples:[{en:"The whale is enormous.", vi:"Con cá voi khổng lồ."},{en:"They live in an enormous house.", vi:"Họ sống trong một ngôi nhà to lớn."}]},
  {id:772, word:"equal", ipa:"/ˈiːkwəl/", pos:"adjective", level:1, vi:"bằng nhau, ngang bằng", examples:[{en:"Cut it into equal parts.", vi:"Cắt nó thành những phần bằng nhau."},{en:"Everyone should be equal.", vi:"Mọi người nên bình đẳng."}]},
  {id:773, word:"exact", ipa:"/ɪɡˈzækt/", pos:"adjective", level:1, vi:"chính xác", examples:[{en:"What is the exact time?", vi:"Chính xác là mấy giờ?"},{en:"Give me the exact number.", vi:"Cho tôi con số chính xác."}]},
  {id:774, word:"excellent", ipa:"/ˈeksələnt/", pos:"adjective", level:1, vi:"xuất sắc, tuyệt hảo", examples:[{en:"You did an excellent job.", vi:"Bạn đã làm rất xuất sắc."},{en:"The food here is excellent.", vi:"Đồ ăn ở đây tuyệt hảo."}]},
  {id:775, word:"exciting", ipa:"/ɪkˈsaɪtɪŋ/", pos:"adjective", level:1, vi:"thú vị, hấp dẫn, gây hứng thú", examples:[{en:"It was an exciting game.", vi:"Đó là một trận đấu hấp dẫn."},{en:"We have exciting news.", vi:"Chúng tôi có tin thú vị."}]},
  {id:776, word:"abroad", ipa:"/əˈbrɔːd/", pos:"adverb", level:1, vi:"ở nước ngoài, ra nước ngoài", examples:[{en:"She studies abroad.", vi:"Cô ấy du học ở nước ngoài."},{en:"They traveled abroad last year.", vi:"Họ đi nước ngoài năm ngoái."}]},
  {id:777, word:"absolutely", ipa:"/ˈæbsəluːtli/", pos:"adverb", level:1, vi:"hoàn toàn, chắc chắn", examples:[{en:"You are absolutely right.", vi:"Bạn hoàn toàn đúng."},{en:"It is absolutely beautiful.", vi:"Nó đẹp tuyệt đối."}]},
  {id:778, word:"actually", ipa:"/ˈæktʃuəli/", pos:"adverb", level:1, vi:"thực ra, thật ra", examples:[{en:"Actually, I prefer tea.", vi:"Thật ra, tôi thích trà hơn."},{en:"It is actually quite easy.", vi:"Thật ra nó khá dễ."}]},
  {id:779, word:"ahead", ipa:"/əˈhed/", pos:"adverb", level:1, vi:"phía trước, lên trước", examples:[{en:"Go straight ahead.", vi:"Đi thẳng về phía trước."},{en:"She walked ahead of us.", vi:"Cô ấy đi trước chúng tôi."}]},
  {id:780, word:"aloud", ipa:"/əˈlaʊd/", pos:"adverb", level:1, vi:"thành tiếng, lớn tiếng", examples:[{en:"Please read aloud.", vi:"Vui lòng đọc to lên."},{en:"She laughed aloud.", vi:"Cô ấy cười thành tiếng."}]},
  {id:781, word:"anymore", ipa:"/ˌeniˈmɔːr/", pos:"adverb", level:1, vi:"nữa (trong câu phủ định)", examples:[{en:"I don't live here anymore.", vi:"Tôi không còn sống ở đây nữa."},{en:"She doesn't cry anymore.", vi:"Cô ấy không khóc nữa."}]},
  {id:782, word:"apart", ipa:"/əˈpɑːrt/", pos:"adverb", level:1, vi:"tách ra, cách xa", examples:[{en:"They live far apart.", vi:"Họ sống cách xa nhau."},{en:"The two houses are close, not far apart.", vi:"Hai ngôi nhà gần nhau, không xa cách."}]},
  {id:783, word:"barely", ipa:"/ˈberli/", pos:"adverb", level:1, vi:"hầu như không, vừa đủ", examples:[{en:"I can barely hear you.", vi:"Tôi hầu như không nghe được bạn."},{en:"She barely ate anything.", vi:"Cô ấy gần như không ăn gì."}]},
  {id:784, word:"briefly", ipa:"/ˈbriːfli/", pos:"adverb", level:1, vi:"ngắn gọn, vắn tắt", examples:[{en:"He spoke briefly.", vi:"Anh ấy nói ngắn gọn."},{en:"Let me explain briefly.", vi:"Để tôi giải thích vắn tắt."}]},
  {id:785, word:"certainly", ipa:"/ˈsɜːrtnli/", pos:"adverb", level:1, vi:"chắc chắn, dĩ nhiên", examples:[{en:"Certainly, I will help.", vi:"Dĩ nhiên, tôi sẽ giúp."},{en:"She is certainly right.", vi:"Cô ấy chắc chắn đúng."}]},
  {id:786, word:"clearly", ipa:"/ˈklɪrli/", pos:"adverb", level:1, vi:"rõ ràng", examples:[{en:"Please speak clearly.", vi:"Vui lòng nói rõ ràng."},{en:"I can see it clearly now.", vi:"Giờ tôi thấy nó rõ rồi."}]},
  {id:787, word:"closely", ipa:"/ˈkloʊsli/", pos:"adverb", level:1, vi:"sát sao, kỹ lưỡng", examples:[{en:"Watch closely.", vi:"Quan sát thật kỹ."},{en:"They work closely together.", vi:"Họ làm việc cùng nhau rất sát sao."}]},
  {id:788, word:"completely", ipa:"/kəmˈpliːtli/", pos:"adverb", level:1, vi:"hoàn toàn", examples:[{en:"I completely agree.", vi:"Tôi hoàn toàn đồng ý."},{en:"The work is completely done.", vi:"Công việc đã hoàn thành hẳn."}]},
  {id:789, word:"deeply", ipa:"/ˈdiːpli/", pos:"adverb", level:1, vi:"sâu sắc, sâu", examples:[{en:"She breathed deeply.", vi:"Cô ấy hít thở thật sâu."},{en:"I am deeply sorry.", vi:"Tôi vô cùng xin lỗi."}]},
  {id:790, word:"easily", ipa:"/ˈiːzəli/", pos:"adverb", level:1, vi:"dễ dàng", examples:[{en:"She solved it easily.", vi:"Cô ấy giải nó một cách dễ dàng."},{en:"You can easily learn this.", vi:"Bạn có thể học cái này dễ dàng."}]},
  {id:791, word:"elsewhere", ipa:"/ˈelswer/", pos:"adverb", level:1, vi:"ở nơi khác, chỗ khác", examples:[{en:"Let's look elsewhere.", vi:"Mình tìm chỗ khác nhé."},{en:"He found a job elsewhere.", vi:"Anh ấy tìm được việc ở nơi khác."}]},
  {id:792, word:"entirely", ipa:"/ɪnˈtaɪərli/", pos:"adverb", level:1, vi:"hoàn toàn, toàn bộ", examples:[{en:"That is entirely true.", vi:"Điều đó hoàn toàn đúng."},{en:"It is an entirely new idea.", vi:"Đó là một ý tưởng hoàn toàn mới."}]},
  {id:793, word:"especially", ipa:"/ɪˈspeʃəli/", pos:"adverb", level:1, vi:"đặc biệt là, nhất là", examples:[{en:"I love fruit, especially mangoes.", vi:"Tôi thích trái cây, đặc biệt là xoài."},{en:"It is cold, especially at night.", vi:"Trời lạnh, nhất là vào ban đêm."}]},
  {id:794, word:"eventually", ipa:"/ɪˈventʃuəli/", pos:"adverb", level:1, vi:"cuối cùng (thì), rồi cũng", examples:[{en:"He eventually agreed.", vi:"Cuối cùng anh ấy cũng đồng ý."},{en:"We eventually found the way.", vi:"Rồi chúng tôi cũng tìm được đường."}]},
  {id:795, word:"exactly", ipa:"/ɪɡˈzæktli/", pos:"adverb", level:1, vi:"chính xác, đúng vậy", examples:[{en:"That is exactly what I mean.", vi:"Đó chính xác là điều tôi muốn nói."},{en:"It is exactly nine o'clock.", vi:"Bây giờ chính xác là chín giờ."}]},
  {id:796, word:"either", ipa:"/ˈiːðər/", pos:"conjunction / adverb", level:1, vi:"hoặc; (phủ định) cũng không", examples:[{en:"You can take either one.", vi:"Bạn có thể lấy cái nào cũng được."},{en:"I don't like it either.", vi:"Tôi cũng không thích nó."}]},
  {id:797, word:"neither", ipa:"/ˈniːðər/", pos:"conjunction / adverb", level:1, vi:"không cái nào; cũng không", examples:[{en:"Neither answer is correct.", vi:"Không câu trả lời nào đúng cả."},{en:"I don't smoke, and neither does she.", vi:"Tôi không hút thuốc, và cô ấy cũng vậy."}]},
  {id:798, word:"nobody", ipa:"/ˈnoʊbədi/", pos:"pronoun", level:1, vi:"không ai, chẳng ai", examples:[{en:"Nobody was at home.", vi:"Chẳng có ai ở nhà."},{en:"Nobody knows the answer.", vi:"Không ai biết câu trả lời."}]},
  {id:799, word:"somebody", ipa:"/ˈsʌmbədi/", pos:"pronoun", level:1, vi:"ai đó, một người nào đó", examples:[{en:"Somebody is at the door.", vi:"Có ai đó ở ngoài cửa."},{en:"Somebody left a bag here.", vi:"Ai đó để quên một cái túi ở đây."}]},
  {id:800, word:"ourselves", ipa:"/ɑːrˈselvz/", pos:"pronoun", level:1, vi:"chính chúng tôi, tự chúng tôi", examples:[{en:"We made it ourselves.", vi:"Chúng tôi tự làm ra nó."},{en:"We should take care of ourselves.", vi:"Chúng ta nên tự chăm sóc bản thân."}]}
  // ===== LÔ 6 (CUỐI LEVEL 1): 200 từ, id 801-1000 =====
  // Dán toàn bộ khối này vào sau từ id:800 "ourselves" trong mảng WORDS (trước dấu ]).
  // Khối đã có sẵn dấu phẩy đứng đầu nên nối liền, không cần sửa gì thêm.
  ,{id:801, word:"wash", ipa:"/wɑːʃ/", pos:"verb", level:1, vi:"rửa, giặt", examples:[{en:"Wash your hands before eating.", vi:"Rửa tay trước khi ăn."},{en:"She washes the clothes on Sunday.", vi:"Cô ấy giặt quần áo vào Chủ nhật."}]},
  {id:802, word:"throw", ipa:"/θroʊ/", pos:"verb", level:1, vi:"ném, quăng", examples:[{en:"Throw the ball to me.", vi:"Ném bóng cho tôi đi."},{en:"Don't throw trash on the street.", vi:"Đừng vứt rác ra đường."}]},
  {id:803, word:"cut", ipa:"/kʌt/", pos:"verb", level:1, vi:"cắt", examples:[{en:"Cut the paper in half.", vi:"Cắt đôi tờ giấy."},{en:"He cut his finger.", vi:"Anh ấy bị đứt tay."}]},
  {id:804, word:"swim", ipa:"/swɪm/", pos:"verb", level:1, vi:"bơi", examples:[{en:"I swim every weekend.", vi:"Tôi bơi mỗi cuối tuần."},{en:"Fish swim in the river.", vi:"Cá bơi dưới sông."}]},
  {id:805, word:"wake", ipa:"/weɪk/", pos:"verb", level:1, vi:"thức dậy, đánh thức", examples:[{en:"I wake up at six.", vi:"Tôi thức dậy lúc sáu giờ."},{en:"Please wake me at seven.", vi:"Vui lòng đánh thức tôi lúc bảy giờ."}]},
  {id:806, word:"visit", ipa:"/ˈvɪzɪt/", pos:"verb", level:1, vi:"thăm, ghé thăm", examples:[{en:"We visit our grandparents often.", vi:"Chúng tôi thường thăm ông bà."},{en:"Let's visit the museum.", vi:"Mình đi thăm bảo tàng nhé."}]},
  {id:807, word:"travel", ipa:"/ˈtrævl/", pos:"verb", level:1, vi:"đi du lịch, đi lại", examples:[{en:"I love to travel.", vi:"Tôi thích đi du lịch."},{en:"They travel by train.", vi:"Họ đi lại bằng tàu hỏa."}]},
  {id:808, word:"wonder", ipa:"/ˈwʌndər/", pos:"verb", level:1, vi:"tự hỏi, băn khoăn", examples:[{en:"I wonder where she is.", vi:"Tôi tự hỏi cô ấy đang ở đâu."},{en:"I wonder if it will rain.", vi:"Không biết trời có mưa không."}]},
  {id:809, word:"wish", ipa:"/wɪʃ/", pos:"verb", level:1, vi:"ước, mong", examples:[{en:"I wish you good luck.", vi:"Tôi chúc bạn may mắn."},{en:"She wishes to travel the world.", vi:"Cô ấy ước được đi khắp thế giới."}]},
  {id:810, word:"thank", ipa:"/θæŋk/", pos:"verb", level:1, vi:"cảm ơn", examples:[{en:"I want to thank you.", vi:"Tôi muốn cảm ơn bạn."},{en:"She thanked the driver.", vi:"Cô ấy cảm ơn bác tài."}]},
  {id:811, word:"wrap", ipa:"/ræp/", pos:"verb", level:1, vi:"gói, bọc", examples:[{en:"Wrap the gift in paper.", vi:"Gói món quà bằng giấy."},{en:"She wrapped a scarf around her neck.", vi:"Cô ấy quấn khăn quanh cổ."}]},
  {id:812, word:"wipe", ipa:"/waɪp/", pos:"verb", level:1, vi:"lau, chùi", examples:[{en:"Wipe the table, please.", vi:"Lau bàn giúp tôi nhé."},{en:"He wiped his hands on a towel.", vi:"Anh ấy lau tay vào khăn."}]},
  {id:813, word:"warn", ipa:"/wɔːrn/", pos:"verb", level:1, vi:"cảnh báo, báo trước", examples:[{en:"I warned you about the dog.", vi:"Tôi đã cảnh báo bạn về con chó."},{en:"The sign warns of danger.", vi:"Tấm biển cảnh báo nguy hiểm."}]},
  {id:814, word:"wave", ipa:"/weɪv/", pos:"verb", level:1, vi:"vẫy tay; vẫy", examples:[{en:"She waved goodbye.", vi:"Cô ấy vẫy tay chào tạm biệt."},{en:"He waved at his friend.", vi:"Anh ấy vẫy tay với bạn."}]},
  {id:815, word:"suggest", ipa:"/səˈdʒest/", pos:"verb", level:1, vi:"đề nghị, gợi ý", examples:[{en:"I suggest we leave early.", vi:"Tôi đề nghị mình đi sớm."},{en:"What do you suggest?", vi:"Bạn gợi ý gì nào?"}]},
  {id:816, word:"support", ipa:"/səˈpɔːrt/", pos:"verb", level:1, vi:"ủng hộ, hỗ trợ", examples:[{en:"I support your idea.", vi:"Tôi ủng hộ ý tưởng của bạn."},{en:"Her family supports her.", vi:"Gia đình ủng hộ cô ấy."}]},
  {id:817, word:"suppose", ipa:"/səˈpoʊz/", pos:"verb", level:1, vi:"cho rằng, đoán là", examples:[{en:"I suppose you are right.", vi:"Tôi cho là bạn đúng."},{en:"She is supposed to be here.", vi:"Đáng lẽ cô ấy phải ở đây."}]},
  {id:818, word:"surprise", ipa:"/sərˈpraɪz/", pos:"verb", level:1, vi:"làm ngạc nhiên", examples:[{en:"The news surprised me.", vi:"Tin đó làm tôi ngạc nhiên."},{en:"We want to surprise her.", vi:"Chúng tôi muốn làm cô ấy bất ngờ."}]},
  {id:819, word:"survive", ipa:"/sərˈvaɪv/", pos:"verb", level:1, vi:"sống sót, tồn tại", examples:[{en:"They survived the storm.", vi:"Họ sống sót qua cơn bão."},{en:"Plants need water to survive.", vi:"Cây cần nước để sống."}]},
  {id:820, word:"solve", ipa:"/sɑːlv/", pos:"verb", level:1, vi:"giải quyết, giải (toán)", examples:[{en:"Can you solve this problem?", vi:"Bạn giải được bài này không?"},{en:"We need to solve it together.", vi:"Chúng ta cần cùng nhau giải quyết."}]},
  {id:821, word:"spread", ipa:"/spred/", pos:"verb", level:1, vi:"lan ra; phết, trải", examples:[{en:"The fire spread quickly.", vi:"Đám cháy lan ra nhanh chóng."},{en:"Spread butter on the bread.", vi:"Phết bơ lên bánh mì."}]},
  {id:822, word:"steal", ipa:"/stiːl/", pos:"verb", level:1, vi:"ăn cắp, trộm", examples:[{en:"Someone stole my bike.", vi:"Ai đó đã trộm xe đạp của tôi."},{en:"It is wrong to steal.", vi:"Ăn cắp là sai."}]},
  {id:823, word:"stick", ipa:"/stɪk/", pos:"verb", level:1, vi:"dán, gắn; kẹt", examples:[{en:"Stick the stamp on the letter.", vi:"Dán tem lên lá thư."},{en:"The door is stuck.", vi:"Cánh cửa bị kẹt."}]},
  {id:824, word:"stretch", ipa:"/stretʃ/", pos:"verb", level:1, vi:"duỗi, kéo căng", examples:[{en:"Stretch your arms up.", vi:"Duỗi tay lên cao."},{en:"She stretched before running.", vi:"Cô ấy khởi động trước khi chạy."}]},
  {id:825, word:"strike", ipa:"/straɪk/", pos:"verb", level:1, vi:"đánh, đập mạnh", examples:[{en:"Lightning struck the tree.", vi:"Sét đánh trúng cái cây."},{en:"The clock struck twelve.", vi:"Đồng hồ điểm mười hai giờ."}]},
  {id:826, word:"suffer", ipa:"/ˈsʌfər/", pos:"verb", level:1, vi:"chịu đựng, đau khổ", examples:[{en:"He suffers from headaches.", vi:"Anh ấy bị những cơn đau đầu hành hạ."},{en:"Many people suffered in the war.", vi:"Nhiều người chịu khổ trong chiến tranh."}]},
  {id:827, word:"swallow", ipa:"/ˈswɑːloʊ/", pos:"verb", level:1, vi:"nuốt", examples:[{en:"Chew well before you swallow.", vi:"Nhai kỹ trước khi nuốt."},{en:"It is hard to swallow.", vi:"Khó nuốt quá."}]},
  {id:828, word:"sweep", ipa:"/swiːp/", pos:"verb", level:1, vi:"quét", examples:[{en:"Please sweep the floor.", vi:"Vui lòng quét nhà."},{en:"He swept the leaves away.", vi:"Anh ấy quét lá đi."}]},
  {id:829, word:"touch", ipa:"/tʌtʃ/", pos:"verb", level:1, vi:"chạm, sờ", examples:[{en:"Don't touch the hot pan.", vi:"Đừng chạm vào cái chảo nóng."},{en:"She touched my shoulder.", vi:"Cô ấy chạm vào vai tôi."}]},
  {id:830, word:"train", ipa:"/treɪn/", pos:"verb", level:1, vi:"huấn luyện, rèn luyện", examples:[{en:"He trains every morning.", vi:"Anh ấy luyện tập mỗi sáng."},{en:"She trains dogs.", vi:"Cô ấy huấn luyện chó."}]},
  {id:831, word:"treat", ipa:"/triːt/", pos:"verb", level:1, vi:"đối xử; điều trị", examples:[{en:"Treat others with respect.", vi:"Hãy đối xử với người khác bằng sự tôn trọng."},{en:"The doctor treated my cold.", vi:"Bác sĩ chữa cảm cho tôi."}]},
  {id:832, word:"trust", ipa:"/trʌst/", pos:"verb", level:1, vi:"tin tưởng, tin cậy", examples:[{en:"I trust you.", vi:"Tôi tin bạn."},{en:"You can trust her.", vi:"Bạn có thể tin cô ấy."}]},
  {id:833, word:"type", ipa:"/taɪp/", pos:"verb", level:1, vi:"gõ (bàn phím), đánh máy", examples:[{en:"She types very fast.", vi:"Cô ấy gõ phím rất nhanh."},{en:"Type your name here.", vi:"Gõ tên bạn vào đây."}]},
  {id:834, word:"vote", ipa:"/voʊt/", pos:"verb", level:1, vi:"bỏ phiếu, bầu chọn", examples:[{en:"People vote for a leader.", vi:"Người dân bỏ phiếu chọn một nhà lãnh đạo."},{en:"Did you vote yet?", vi:"Bạn bỏ phiếu chưa?"}]},
  {id:835, word:"weigh", ipa:"/weɪ/", pos:"verb", level:1, vi:"cân; nặng (bao nhiêu)", examples:[{en:"How much do you weigh?", vi:"Bạn nặng bao nhiêu?"},{en:"Please weigh the apples.", vi:"Vui lòng cân số táo."}]},
  {id:836, word:"whisper", ipa:"/ˈwɪspər/", pos:"verb", level:1, vi:"thì thầm, nói nhỏ", examples:[{en:"She whispered a secret.", vi:"Cô ấy thì thầm một bí mật."},{en:"Please whisper in the library.", vi:"Vui lòng nói nhỏ trong thư viện."}]},
  {id:837, word:"prefer", ipa:"/prɪˈfɜːr/", pos:"verb", level:1, vi:"thích hơn, ưa hơn", examples:[{en:"I prefer tea to coffee.", vi:"Tôi thích trà hơn cà phê."},{en:"Which do you prefer?", vi:"Bạn thích cái nào hơn?"}]},
  {id:838, word:"prevent", ipa:"/prɪˈvent/", pos:"verb", level:1, vi:"ngăn chặn, phòng ngừa", examples:[{en:"Wash your hands to prevent illness.", vi:"Rửa tay để phòng bệnh."},{en:"We must prevent accidents.", vi:"Chúng ta phải ngăn ngừa tai nạn."}]},
  {id:839, word:"pretend", ipa:"/prɪˈtend/", pos:"verb", level:1, vi:"giả vờ, làm bộ", examples:[{en:"The children pretend to be heroes.", vi:"Bọn trẻ giả làm anh hùng."},{en:"Don't pretend you didn't hear.", vi:"Đừng giả vờ là không nghe thấy."}]},
  {id:840, word:"provide", ipa:"/prəˈvaɪd/", pos:"verb", level:1, vi:"cung cấp, cung ứng", examples:[{en:"The school provides free books.", vi:"Trường cung cấp sách miễn phí."},{en:"We provide food to the poor.", vi:"Chúng tôi cung cấp thức ăn cho người nghèo."}]},
  {id:841, word:"punish", ipa:"/ˈpʌnɪʃ/", pos:"verb", level:1, vi:"trừng phạt, phạt", examples:[{en:"The teacher punished the boy.", vi:"Giáo viên phạt cậu bé."},{en:"Do not punish him too hard.", vi:"Đừng phạt cậu ấy quá nặng."}]},
  {id:842, word:"record", ipa:"/rɪˈkɔːrd/", pos:"verb", level:1, vi:"ghi, ghi âm, ghi hình", examples:[{en:"She recorded the song.", vi:"Cô ấy ghi âm bài hát."},{en:"Record the meeting, please.", vi:"Vui lòng ghi hình cuộc họp."}]},
  {id:843, word:"recover", ipa:"/rɪˈkʌvər/", pos:"verb", level:1, vi:"hồi phục, bình phục", examples:[{en:"She is recovering from the flu.", vi:"Cô ấy đang hồi phục sau cơn cúm."},{en:"He recovered quickly.", vi:"Anh ấy bình phục nhanh."}]},
  {id:844, word:"reduce", ipa:"/rɪˈduːs/", pos:"verb", level:1, vi:"giảm, làm giảm", examples:[{en:"We must reduce waste.", vi:"Chúng ta phải giảm rác thải."},{en:"They reduced the price.", vi:"Họ đã giảm giá."}]},
  {id:845, word:"refuse", ipa:"/rɪˈfjuːz/", pos:"verb", level:1, vi:"từ chối", examples:[{en:"He refused my offer.", vi:"Anh ấy từ chối lời đề nghị của tôi."},{en:"She refused to go.", vi:"Cô ấy từ chối đi."}]},
  {id:846, word:"relax", ipa:"/rɪˈlæks/", pos:"verb", level:1, vi:"thư giãn, nghỉ ngơi", examples:[{en:"Relax, everything is fine.", vi:"Thư giãn đi, mọi chuyện ổn cả."},{en:"I relax by reading.", vi:"Tôi thư giãn bằng cách đọc sách."}]},
  {id:847, word:"remain", ipa:"/rɪˈmeɪn/", pos:"verb", level:1, vi:"vẫn còn, ở lại", examples:[{en:"Please remain seated.", vi:"Vui lòng ngồi yên tại chỗ."},{en:"Only a few apples remain.", vi:"Chỉ còn lại vài quả táo."}]},
  {id:848, word:"remind", ipa:"/rɪˈmaɪnd/", pos:"verb", level:1, vi:"nhắc nhở", examples:[{en:"Remind me to call her.", vi:"Nhắc tôi gọi cho cô ấy nhé."},{en:"This song reminds me of summer.", vi:"Bài hát này làm tôi nhớ đến mùa hè."}]},
  {id:849, word:"remove", ipa:"/rɪˈmuːv/", pos:"verb", level:1, vi:"loại bỏ, dời đi, tháo ra", examples:[{en:"Please remove your shoes.", vi:"Vui lòng cởi giày ra."},{en:"Remove the dirty plates.", vi:"Dọn những cái đĩa bẩn đi."}]},
  {id:850, word:"repair", ipa:"/rɪˈper/", pos:"verb", level:1, vi:"sửa chữa", examples:[{en:"He repaired the broken chair.", vi:"Anh ấy sửa cái ghế gãy."},{en:"Can you repair my watch?", vi:"Bạn sửa giúp đồng hồ của tôi được không?"}]},
  {id:851, word:"airplane", ipa:"/ˈerpleɪn/", pos:"noun", level:1, vi:"máy bay", examples:[{en:"The airplane is in the sky.", vi:"Chiếc máy bay đang trên bầu trời."},{en:"We flew on a big airplane.", vi:"Chúng tôi bay trên một chiếc máy bay lớn."}]},
  {id:852, word:"ankle", ipa:"/ˈæŋkl/", pos:"noun", level:1, vi:"mắt cá chân", examples:[{en:"I hurt my ankle.", vi:"Tôi bị đau mắt cá chân."},{en:"She twisted her ankle.", vi:"Cô ấy bị trẹo mắt cá chân."}]},
  {id:853, word:"apron", ipa:"/ˈeɪprən/", pos:"noun", level:1, vi:"cái tạp dề", examples:[{en:"The cook wears an apron.", vi:"Người đầu bếp mặc tạp dề."},{en:"Put on an apron to cook.", vi:"Đeo tạp dề vào để nấu ăn."}]},
  {id:854, word:"baker", ipa:"/ˈbeɪkər/", pos:"noun", level:1, vi:"thợ làm bánh", examples:[{en:"The baker makes fresh bread.", vi:"Người thợ làm bánh mì tươi."},{en:"My uncle is a baker.", vi:"Chú tôi là thợ làm bánh."}]},
  {id:855, word:"bamboo", ipa:"/bæmˈbuː/", pos:"noun", level:1, vi:"cây tre, trúc", examples:[{en:"Pandas eat bamboo.", vi:"Gấu trúc ăn tre."},{en:"The fence is made of bamboo.", vi:"Hàng rào làm bằng tre."}]},
  {id:856, word:"basketball", ipa:"/ˈbæskɪtbɔːl/", pos:"noun", level:1, vi:"bóng rổ", examples:[{en:"They play basketball after school.", vi:"Họ chơi bóng rổ sau giờ học."},{en:"He is good at basketball.", vi:"Cậu ấy chơi bóng rổ giỏi."}]},
  {id:857, word:"bat", ipa:"/bæt/", pos:"noun", level:1, vi:"con dơi; gậy (bóng chày)", examples:[{en:"Bats fly at night.", vi:"Dơi bay vào ban đêm."},{en:"He hit the ball with a bat.", vi:"Anh ấy đánh bóng bằng gậy."}]},
  {id:858, word:"battery", ipa:"/ˈbætri/", pos:"noun", level:1, vi:"pin, ắc quy", examples:[{en:"The battery is low.", vi:"Pin sắp hết."},{en:"I need a new battery.", vi:"Tôi cần một viên pin mới."}]},
  {id:859, word:"beard", ipa:"/bɪrd/", pos:"noun", level:1, vi:"râu (quai nón)", examples:[{en:"He has a long beard.", vi:"Ông ấy có một bộ râu dài."},{en:"The old man's beard is white.", vi:"Râu của ông cụ bạc trắng."}]},
  {id:860, word:"beauty", ipa:"/ˈbjuːti/", pos:"noun", level:1, vi:"vẻ đẹp, cái đẹp", examples:[{en:"The beauty of nature is amazing.", vi:"Vẻ đẹp của thiên nhiên thật tuyệt vời."},{en:"She is famous for her beauty.", vi:"Cô ấy nổi tiếng vì sắc đẹp."}]},
  {id:861, word:"bedroom", ipa:"/ˈbedruːm/", pos:"noun", level:1, vi:"phòng ngủ", examples:[{en:"My bedroom is upstairs.", vi:"Phòng ngủ của tôi ở trên lầu."},{en:"The bedroom is small but cozy.", vi:"Phòng ngủ nhỏ nhưng ấm cúng."}]},
  {id:862, word:"beer", ipa:"/bɪr/", pos:"noun", level:1, vi:"bia", examples:[{en:"He drinks a beer after work.", vi:"Anh ấy uống một cốc bia sau giờ làm."},{en:"This beer is cold.", vi:"Cốc bia này lạnh."}]},
  {id:863, word:"berry", ipa:"/ˈberi/", pos:"noun", level:1, vi:"quả mọng (dâu, việt quất...)", examples:[{en:"Birds eat the berries.", vi:"Chim ăn những quả mọng."},{en:"These berries are sweet.", vi:"Những quả mọng này ngọt."}]},
  {id:864, word:"birthday", ipa:"/ˈbɜːrθdeɪ/", pos:"noun", level:1, vi:"sinh nhật", examples:[{en:"Happy birthday to you!", vi:"Chúc mừng sinh nhật bạn!"},{en:"My birthday is in May.", vi:"Sinh nhật tôi vào tháng Năm."}]},
  {id:865, word:"biscuit", ipa:"/ˈbɪskɪt/", pos:"noun", level:1, vi:"bánh quy", examples:[{en:"Would you like a biscuit?", vi:"Bạn dùng một cái bánh quy nhé?"},{en:"She baked some biscuits.", vi:"Cô ấy nướng vài cái bánh quy."}]},
  {id:866, word:"blade", ipa:"/bleɪd/", pos:"noun", level:1, vi:"lưỡi (dao, kéo)", examples:[{en:"The blade is very sharp.", vi:"Lưỡi dao rất sắc."},{en:"Be careful with the blade.", vi:"Cẩn thận với cái lưỡi dao."}]},
  {id:867, word:"blouse", ipa:"/blaʊs/", pos:"noun", level:1, vi:"áo cánh (nữ)", examples:[{en:"She wore a white blouse.", vi:"Cô ấy mặc một chiếc áo cánh trắng."},{en:"This blouse is too big.", vi:"Cái áo này rộng quá."}]},
  {id:868, word:"boot", ipa:"/buːt/", pos:"noun", level:1, vi:"giày bốt, ủng", examples:[{en:"Wear your boots in the rain.", vi:"Đi ủng khi trời mưa nhé."},{en:"These boots are warm.", vi:"Đôi bốt này ấm."}]},
  {id:869, word:"border", ipa:"/ˈbɔːrdər/", pos:"noun", level:1, vi:"biên giới, đường biên", examples:[{en:"They crossed the border.", vi:"Họ vượt qua biên giới."},{en:"The border is closed.", vi:"Biên giới bị đóng."}]},
  {id:870, word:"boss", ipa:"/bɔːs/", pos:"noun", level:1, vi:"sếp, ông chủ", examples:[{en:"My boss is very kind.", vi:"Sếp của tôi rất tử tế."},{en:"She talked to her boss.", vi:"Cô ấy nói chuyện với sếp."}]},
  {id:871, word:"bracelet", ipa:"/ˈbreɪslət/", pos:"noun", level:1, vi:"vòng tay", examples:[{en:"She wears a silver bracelet.", vi:"Cô ấy đeo một chiếc vòng tay bạc."},{en:"He gave me a bracelet.", vi:"Anh ấy tặng tôi một chiếc vòng tay."}]},
  {id:872, word:"brand", ipa:"/brænd/", pos:"noun", level:1, vi:"thương hiệu, nhãn hiệu", examples:[{en:"What brand are these shoes?", vi:"Đôi giày này thương hiệu gì?"},{en:"It is a popular brand.", vi:"Đó là một thương hiệu được ưa chuộng."}]},
  {id:873, word:"breeze", ipa:"/briːz/", pos:"noun", level:1, vi:"làn gió nhẹ", examples:[{en:"A cool breeze is blowing.", vi:"Một làn gió mát đang thổi."},{en:"I enjoy the sea breeze.", vi:"Tôi thích làn gió biển."}]},
  {id:874, word:"broom", ipa:"/bruːm/", pos:"noun", level:1, vi:"cái chổi", examples:[{en:"Sweep the floor with a broom.", vi:"Quét nhà bằng chổi."},{en:"The broom is behind the door.", vi:"Cái chổi ở sau cánh cửa."}]},
  {id:875, word:"bug", ipa:"/bʌɡ/", pos:"noun", level:1, vi:"con bọ, côn trùng nhỏ", examples:[{en:"There is a bug on the wall.", vi:"Có một con bọ trên tường."},{en:"Bugs come out in summer.", vi:"Côn trùng xuất hiện vào mùa hè."}]},
  {id:876, word:"bunch", ipa:"/bʌntʃ/", pos:"noun", level:1, vi:"chùm, bó, nhóm", examples:[{en:"She bought a bunch of bananas.", vi:"Cô ấy mua một nải chuối."},{en:"A bunch of kids were playing.", vi:"Một nhóm trẻ đang chơi."}]},
  {id:877, word:"bush", ipa:"/bʊʃ/", pos:"noun", level:1, vi:"bụi cây", examples:[{en:"A bird hid in the bush.", vi:"Một con chim nấp trong bụi cây."},{en:"The bushes need cutting.", vi:"Mấy bụi cây cần được tỉa."}]},
  {id:878, word:"cabin", ipa:"/ˈkæbɪn/", pos:"noun", level:1, vi:"nhà gỗ nhỏ; khoang (máy bay)", examples:[{en:"We stayed in a wooden cabin.", vi:"Chúng tôi ở trong một căn nhà gỗ nhỏ."},{en:"The cabin was warm and quiet.", vi:"Căn nhà nhỏ ấm áp và yên tĩnh."}]},
  {id:879, word:"cable", ipa:"/ˈkeɪbl/", pos:"noun", level:1, vi:"dây cáp", examples:[{en:"Plug the cable into the TV.", vi:"Cắm dây cáp vào tivi."},{en:"The cable is too short.", vi:"Sợi cáp ngắn quá."}]},
  {id:880, word:"cage", ipa:"/keɪdʒ/", pos:"noun", level:1, vi:"cái lồng, chuồng", examples:[{en:"The bird is in a cage.", vi:"Con chim ở trong lồng."},{en:"Open the cage door.", vi:"Mở cửa lồng ra."}]},
  {id:881, word:"calendar", ipa:"/ˈkælɪndər/", pos:"noun", level:1, vi:"lịch (treo tường, để bàn)", examples:[{en:"Look at the calendar.", vi:"Xem lịch đi."},{en:"I marked the date on the calendar.", vi:"Tôi đã đánh dấu ngày đó trên lịch."}]},
  {id:882, word:"camel", ipa:"/ˈkæml/", pos:"noun", level:1, vi:"con lạc đà", examples:[{en:"Camels live in the desert.", vi:"Lạc đà sống ở sa mạc."},{en:"A camel can go a long time without water.", vi:"Lạc đà có thể nhịn nước lâu."}]},
  {id:883, word:"cartoon", ipa:"/kɑːrˈtuːn/", pos:"noun", level:1, vi:"phim hoạt hình", examples:[{en:"Kids love cartoons.", vi:"Trẻ con thích phim hoạt hình."},{en:"We watched a funny cartoon.", vi:"Chúng tôi xem một bộ hoạt hình vui nhộn."}]},
  {id:884, word:"cent", ipa:"/sent/", pos:"noun", level:1, vi:"xu (đơn vị tiền)", examples:[{en:"It costs ninety-nine cents.", vi:"Nó giá chín mươi chín xu."},{en:"I don't have a single cent.", vi:"Tôi không có lấy một xu."}]},
  {id:885, word:"ceremony", ipa:"/ˈserəmoʊni/", pos:"noun", level:1, vi:"buổi lễ, nghi lễ", examples:[{en:"The wedding ceremony was beautiful.", vi:"Buổi lễ cưới thật đẹp."},{en:"Many people came to the ceremony.", vi:"Nhiều người đến dự buổi lễ."}]},
  {id:886, word:"chalk", ipa:"/tʃɔːk/", pos:"noun", level:1, vi:"phấn (viết bảng)", examples:[{en:"The teacher writes with chalk.", vi:"Giáo viên viết bằng phấn."},{en:"We need more chalk.", vi:"Chúng ta cần thêm phấn."}]},
  {id:887, word:"champion", ipa:"/ˈtʃæmpiən/", pos:"noun", level:1, vi:"nhà vô địch", examples:[{en:"She is the champion this year.", vi:"Cô ấy là nhà vô địch năm nay."},{en:"Our team became champions.", vi:"Đội của chúng tôi trở thành nhà vô địch."}]},
  {id:888, word:"chapter", ipa:"/ˈtʃæptər/", pos:"noun", level:1, vi:"chương (sách)", examples:[{en:"Read the first chapter tonight.", vi:"Đọc chương đầu tối nay nhé."},{en:"This book has ten chapters.", vi:"Cuốn sách này có mười chương."}]},
  {id:889, word:"character", ipa:"/ˈkærəktər/", pos:"noun", level:1, vi:"nhân vật; tính cách", examples:[{en:"Who is your favorite character?", vi:"Nhân vật bạn thích nhất là ai?"},{en:"She has a strong character.", vi:"Cô ấy có một tính cách mạnh mẽ."}]},
  {id:890, word:"cherry", ipa:"/ˈtʃeri/", pos:"noun", level:1, vi:"quả anh đào", examples:[{en:"The cake has a cherry on top.", vi:"Cái bánh có một quả anh đào ở trên."},{en:"Cherries are small and red.", vi:"Quả anh đào nhỏ và đỏ."}]},
  {id:891, word:"clay", ipa:"/kleɪ/", pos:"noun", level:1, vi:"đất sét", examples:[{en:"The pot is made of clay.", vi:"Cái nồi làm bằng đất sét."},{en:"Children play with clay.", vi:"Trẻ con chơi với đất sét."}]},
  {id:892, word:"clinic", ipa:"/ˈklɪnɪk/", pos:"noun", level:1, vi:"phòng khám", examples:[{en:"The clinic opens at eight.", vi:"Phòng khám mở cửa lúc tám giờ."},{en:"She works at a small clinic.", vi:"Cô ấy làm việc ở một phòng khám nhỏ."}]},
  {id:893, word:"closet", ipa:"/ˈklɑːzət/", pos:"noun", level:1, vi:"tủ quần áo", examples:[{en:"Hang your coat in the closet.", vi:"Treo áo khoác vào tủ."},{en:"The closet is full of clothes.", vi:"Cái tủ đầy quần áo."}]},
  {id:894, word:"clothes", ipa:"/kloʊðz/", pos:"noun", level:1, vi:"quần áo", examples:[{en:"Put on warm clothes.", vi:"Mặc quần áo ấm vào."},{en:"She washed the clothes.", vi:"Cô ấy giặt quần áo."}]},
  {id:895, word:"coach", ipa:"/koʊtʃ/", pos:"noun", level:1, vi:"huấn luyện viên", examples:[{en:"The coach trains the team.", vi:"Huấn luyện viên rèn luyện cho đội."},{en:"Our coach is very strict.", vi:"Huấn luyện viên của chúng tôi rất nghiêm."}]},
  {id:896, word:"coal", ipa:"/koʊl/", pos:"noun", level:1, vi:"than đá", examples:[{en:"They burn coal for heat.", vi:"Họ đốt than để sưởi ấm."},{en:"Coal is black and hard.", vi:"Than đá màu đen và cứng."}]},
  {id:897, word:"cookie", ipa:"/ˈkʊki/", pos:"noun", level:1, vi:"bánh quy (ngọt)", examples:[{en:"I baked some cookies.", vi:"Tôi nướng vài cái bánh quy."},{en:"The cookies smell great.", vi:"Mấy cái bánh quy thơm quá."}]},
  {id:898, word:"council", ipa:"/ˈkaʊnsl/", pos:"noun", level:1, vi:"hội đồng", examples:[{en:"The city council met today.", vi:"Hội đồng thành phố họp hôm nay."},{en:"She is a council member.", vi:"Cô ấy là một thành viên hội đồng."}]},
  {id:899, word:"court", ipa:"/kɔːrt/", pos:"noun", level:1, vi:"tòa án; sân (thể thao)", examples:[{en:"The case went to court.", vi:"Vụ việc được đưa ra tòa."},{en:"They play tennis on the court.", vi:"Họ chơi quần vợt trên sân."}]},
  {id:900, word:"cracker", ipa:"/ˈkrækər/", pos:"noun", level:1, vi:"bánh quy giòn (mặn)", examples:[{en:"I ate cheese and crackers.", vi:"Tôi ăn phô mai với bánh quy giòn."},{en:"The crackers are very salty.", vi:"Mấy cái bánh quy giòn rất mặn."}]},
  {id:901, word:"crew", ipa:"/kruː/", pos:"noun", level:1, vi:"phi hành đoàn, đội (làm việc)", examples:[{en:"The crew worked all night.", vi:"Đội đã làm việc suốt đêm."},{en:"The ship has a small crew.", vi:"Con tàu có một đội thủy thủ nhỏ."}]},
  {id:902, word:"crop", ipa:"/krɑːp/", pos:"noun", level:1, vi:"vụ mùa, cây trồng", examples:[{en:"Rice is an important crop.", vi:"Lúa là một cây trồng quan trọng."},{en:"The crops grow well this year.", vi:"Mùa màng năm nay tốt."}]},
  {id:903, word:"cube", ipa:"/kjuːb/", pos:"noun", level:1, vi:"khối lập phương; viên (đá)", examples:[{en:"Put an ice cube in my drink.", vi:"Cho một viên đá vào ly của tôi."},{en:"A cube has six sides.", vi:"Khối lập phương có sáu mặt."}]},
  {id:904, word:"dawn", ipa:"/dɔːn/", pos:"noun", level:1, vi:"bình minh, rạng đông", examples:[{en:"We left at dawn.", vi:"Chúng tôi rời đi lúc bình minh."},{en:"The birds sing at dawn.", vi:"Chim hót lúc rạng đông."}]},
  {id:905, word:"deck", ipa:"/dek/", pos:"noun", level:1, vi:"boong tàu; sàn (gỗ)", examples:[{en:"We stood on the deck of the ship.", vi:"Chúng tôi đứng trên boong tàu."},{en:"They had dinner on the deck.", vi:"Họ ăn tối trên sàn gỗ."}]},
  {id:906, word:"department", ipa:"/dɪˈpɑːrtmənt/", pos:"noun", level:1, vi:"phòng ban, bộ phận", examples:[{en:"She works in the sales department.", vi:"Cô ấy làm ở bộ phận bán hàng."},{en:"Which department do you need?", vi:"Bạn cần phòng ban nào?"}]},
  {id:907, word:"diary", ipa:"/ˈdaɪəri/", pos:"noun", level:1, vi:"nhật ký", examples:[{en:"She writes in her diary every night.", vi:"Cô ấy viết nhật ký mỗi tối."},{en:"Keep a diary of your trip.", vi:"Hãy ghi nhật ký chuyến đi của bạn."}]},
  {id:908, word:"dot", ipa:"/dɑːt/", pos:"noun", level:1, vi:"dấu chấm, chấm tròn", examples:[{en:"Put a dot here.", vi:"Đặt một dấu chấm ở đây."},{en:"The dress has white dots.", vi:"Chiếc váy có những chấm trắng."}]},
  {id:909, word:"dozen", ipa:"/ˈdʌzn/", pos:"noun", level:1, vi:"tá (mười hai cái)", examples:[{en:"I bought a dozen eggs.", vi:"Tôi mua một tá trứng."},{en:"A dozen means twelve.", vi:"Một tá nghĩa là mười hai."}]},
  {id:910, word:"drawing", ipa:"/ˈdrɔːɪŋ/", pos:"noun", level:1, vi:"bức vẽ, bản vẽ", examples:[{en:"This is a nice drawing.", vi:"Đây là một bức vẽ đẹp."},{en:"She showed me her drawings.", vi:"Cô ấy cho tôi xem các bức vẽ của mình."}]},
  {id:911, word:"eagle", ipa:"/ˈiːɡl/", pos:"noun", level:1, vi:"đại bàng", examples:[{en:"The eagle flew high.", vi:"Con đại bàng bay cao."},{en:"Eagles have sharp eyes.", vi:"Đại bàng có đôi mắt sắc bén."}]},
  {id:912, word:"east", ipa:"/iːst/", pos:"noun", level:1, vi:"hướng đông, phía đông", examples:[{en:"The sun rises in the east.", vi:"Mặt trời mọc ở hướng đông."},{en:"They traveled to the east.", vi:"Họ đi về phía đông."}]},
  {id:913, word:"economy", ipa:"/ɪˈkɑːnəmi/", pos:"noun", level:1, vi:"nền kinh tế", examples:[{en:"The economy is growing.", vi:"Nền kinh tế đang phát triển."},{en:"Tourism helps the economy.", vi:"Du lịch giúp ích cho nền kinh tế."}]},
  {id:914, word:"education", ipa:"/ˌedʒuˈkeɪʃn/", pos:"noun", level:1, vi:"giáo dục, sự học hành", examples:[{en:"Education is very important.", vi:"Giáo dục rất quan trọng."},{en:"She had a good education.", vi:"Cô ấy được học hành tử tế."}]},
  {id:915, word:"elbow", ipa:"/ˈelboʊ/", pos:"noun", level:1, vi:"khuỷu tay", examples:[{en:"I hurt my elbow.", vi:"Tôi bị đau khuỷu tay."},{en:"Don't put your elbows on the table.", vi:"Đừng chống khuỷu tay lên bàn."}]},
  {id:916, word:"election", ipa:"/ɪˈlekʃn/", pos:"noun", level:1, vi:"cuộc bầu cử", examples:[{en:"The election is next month.", vi:"Cuộc bầu cử diễn ra vào tháng sau."},{en:"Many people voted in the election.", vi:"Nhiều người đã bỏ phiếu trong cuộc bầu cử."}]},
  {id:917, word:"elephant", ipa:"/ˈelɪfənt/", pos:"noun", level:1, vi:"con voi", examples:[{en:"Elephants are very big.", vi:"Voi rất to."},{en:"The elephant has a long trunk.", vi:"Con voi có cái vòi dài."}]},
  {id:918, word:"emotion", ipa:"/ɪˈmoʊʃn/", pos:"noun", level:1, vi:"cảm xúc, tình cảm", examples:[{en:"She showed no emotion.", vi:"Cô ấy không để lộ cảm xúc."},{en:"Music can stir our emotions.", vi:"Âm nhạc có thể khơi gợi cảm xúc của chúng ta."}]},
  {id:919, word:"employee", ipa:"/ɪmˈplɔɪiː/", pos:"noun", level:1, vi:"nhân viên", examples:[{en:"The company has many employees.", vi:"Công ty có nhiều nhân viên."},{en:"She is a good employee.", vi:"Cô ấy là một nhân viên giỏi."}]},
  {id:920, word:"enemy", ipa:"/ˈenəmi/", pos:"noun", level:1, vi:"kẻ thù, kẻ địch", examples:[{en:"He has no enemies.", vi:"Anh ấy không có kẻ thù nào."},{en:"They became enemies.", vi:"Họ trở thành kẻ thù của nhau."}]},
  {id:921, word:"engineer", ipa:"/ˌendʒɪˈnɪr/", pos:"noun", level:1, vi:"kỹ sư", examples:[{en:"My father is an engineer.", vi:"Bố tôi là kỹ sư."},{en:"The engineer designed the bridge.", vi:"Kỹ sư đã thiết kế cây cầu."}]},
  {id:922, word:"entrance", ipa:"/ˈentrəns/", pos:"noun", level:1, vi:"lối vào, cửa vào", examples:[{en:"Wait at the main entrance.", vi:"Đợi ở lối vào chính nhé."},{en:"The entrance is on the left.", vi:"Lối vào ở bên trái."}]},
  {id:923, word:"envelope", ipa:"/ˈenvəloʊp/", pos:"noun", level:1, vi:"phong bì", examples:[{en:"Put the letter in the envelope.", vi:"Bỏ lá thư vào phong bì."},{en:"She opened the envelope.", vi:"Cô ấy mở phong bì."}]},
  {id:924, word:"equipment", ipa:"/ɪˈkwɪpmənt/", pos:"noun", level:1, vi:"trang thiết bị, dụng cụ", examples:[{en:"The gym has new equipment.", vi:"Phòng tập có thiết bị mới."},{en:"We need camping equipment.", vi:"Chúng tôi cần dụng cụ cắm trại."}]},
  {id:925, word:"error", ipa:"/ˈerər/", pos:"noun", level:1, vi:"lỗi, sai sót", examples:[{en:"There is an error in the report.", vi:"Có một lỗi trong bản báo cáo."},{en:"The computer showed an error.", vi:"Máy tính báo lỗi."}]},
  {id:926, word:"expert", ipa:"/ˈekspɜːrt/", pos:"noun", level:1, vi:"chuyên gia", examples:[{en:"She is an expert in history.", vi:"Cô ấy là chuyên gia về lịch sử."},{en:"Ask an expert for advice.", vi:"Hãy hỏi chuyên gia để được tư vấn."}]},
  {id:927, word:"fairy", ipa:"/ˈferi/", pos:"noun", level:1, vi:"nàng tiên, tiên", examples:[{en:"The story is about a fairy.", vi:"Câu chuyện kể về một nàng tiên."},{en:"Children love fairy tales.", vi:"Trẻ con thích truyện cổ tích."}]},
  {id:928, word:"farmer", ipa:"/ˈfɑːrmər/", pos:"noun", level:1, vi:"nông dân", examples:[{en:"The farmer grows rice.", vi:"Người nông dân trồng lúa."},{en:"Farmers work very hard.", vi:"Nông dân làm việc rất vất vả."}]},
  {id:929, word:"fault", ipa:"/fɔːlt/", pos:"noun", level:1, vi:"lỗi, sai sót (thuộc về ai)", examples:[{en:"It is not your fault.", vi:"Đó không phải lỗi của bạn."},{en:"He admitted his fault.", vi:"Anh ấy thừa nhận lỗi của mình."}]},
  {id:930, word:"feather", ipa:"/ˈfeðər/", pos:"noun", level:1, vi:"lông vũ, lông chim", examples:[{en:"The bird has soft feathers.", vi:"Con chim có bộ lông mềm mại."},{en:"A feather fell from the sky.", vi:"Một chiếc lông rơi từ trên trời."}]},
  {id:931, word:"huge", ipa:"/hjuːdʒ/", pos:"adjective", level:1, vi:"khổng lồ, to lớn", examples:[{en:"They live in a huge house.", vi:"Họ sống trong một ngôi nhà rất lớn."},{en:"The elephant is huge.", vi:"Con voi to khổng lồ."}]},
  {id:932, word:"tiny", ipa:"/ˈtaɪni/", pos:"adjective", level:1, vi:"bé tí, nhỏ xíu", examples:[{en:"A tiny ant climbed the wall.", vi:"Một con kiến bé tí leo lên tường."},{en:"The room is tiny.", vi:"Căn phòng nhỏ xíu."}]},
  {id:933, word:"tall", ipa:"/tɔːl/", pos:"adjective", level:1, vi:"cao", examples:[{en:"He is very tall.", vi:"Anh ấy rất cao."},{en:"That is a tall tree.", vi:"Đó là một cái cây cao."}]},
  {id:934, word:"thick", ipa:"/θɪk/", pos:"adjective", level:1, vi:"dày", examples:[{en:"This is a thick book.", vi:"Đây là một cuốn sách dày."},{en:"Wear a thick coat.", vi:"Mặc một chiếc áo khoác dày vào."}]},
  {id:935, word:"thin", ipa:"/θɪn/", pos:"adjective", level:1, vi:"mỏng; gầy", examples:[{en:"The ice is too thin.", vi:"Lớp băng mỏng quá."},{en:"He is tall and thin.", vi:"Anh ấy cao và gầy."}]},
  {id:936, word:"round", ipa:"/raʊnd/", pos:"adjective", level:1, vi:"tròn", examples:[{en:"The table is round.", vi:"Cái bàn hình tròn."},{en:"The moon is round tonight.", vi:"Tối nay trăng tròn."}]},
  {id:937, word:"sharp", ipa:"/ʃɑːrp/", pos:"adjective", level:1, vi:"sắc, bén; nhọn", examples:[{en:"This knife is very sharp.", vi:"Con dao này rất sắc."},{en:"The pencil has a sharp point.", vi:"Cây bút chì có đầu nhọn."}]},
  {id:938, word:"smooth", ipa:"/smuːð/", pos:"adjective", level:1, vi:"mịn, trơn, mượt", examples:[{en:"Her skin is smooth.", vi:"Da cô ấy mịn màng."},{en:"The road is smooth.", vi:"Con đường bằng phẳng."}]},
  {id:939, word:"soft", ipa:"/sɔːft/", pos:"adjective", level:1, vi:"mềm, êm", examples:[{en:"The pillow is soft.", vi:"Cái gối êm."},{en:"She has a soft voice.", vi:"Cô ấy có giọng nói nhẹ nhàng."}]},
  {id:940, word:"sweet", ipa:"/swiːt/", pos:"adjective", level:1, vi:"ngọt; dễ thương", examples:[{en:"This cake is too sweet.", vi:"Cái bánh này ngọt quá."},{en:"That was a sweet thing to say.", vi:"Đó là một lời nói thật dễ thương."}]},
  {id:941, word:"sour", ipa:"/ˈsaʊər/", pos:"adjective", level:1, vi:"chua", examples:[{en:"This lemon is very sour.", vi:"Quả chanh này rất chua."},{en:"The milk has gone sour.", vi:"Sữa đã bị chua."}]},
  {id:942, word:"salty", ipa:"/ˈsɔːlti/", pos:"adjective", level:1, vi:"mặn", examples:[{en:"The soup is too salty.", vi:"Món súp mặn quá."},{en:"Sea water is salty.", vi:"Nước biển mặn."}]},
  {id:943, word:"spicy", ipa:"/ˈspaɪsi/", pos:"adjective", level:1, vi:"cay", examples:[{en:"I like spicy food.", vi:"Tôi thích đồ ăn cay."},{en:"This soup is very spicy.", vi:"Món súp này rất cay."}]},
  {id:944, word:"sleepy", ipa:"/ˈsliːpi/", pos:"adjective", level:1, vi:"buồn ngủ", examples:[{en:"I feel sleepy after lunch.", vi:"Tôi thấy buồn ngủ sau bữa trưa."},{en:"The baby looks sleepy.", vi:"Em bé trông buồn ngủ."}]},
  {id:945, word:"silly", ipa:"/ˈsɪli/", pos:"adjective", level:1, vi:"ngớ ngẩn, ngốc nghếch", examples:[{en:"That was a silly mistake.", vi:"Đó là một lỗi ngớ ngẩn."},{en:"Don't be silly.", vi:"Đừng có ngốc thế."}]},
  {id:946, word:"simple", ipa:"/ˈsɪmpl/", pos:"adjective", level:1, vi:"đơn giản, giản dị", examples:[{en:"It is a simple question.", vi:"Đó là một câu hỏi đơn giản."},{en:"They live a simple life.", vi:"Họ sống một cuộc sống giản dị."}]},
  {id:947, word:"silent", ipa:"/ˈsaɪlənt/", pos:"adjective", level:1, vi:"im lặng, lặng lẽ", examples:[{en:"The room was silent.", vi:"Căn phòng im lặng."},{en:"Please be silent.", vi:"Vui lòng giữ im lặng."}]},
  {id:948, word:"sick", ipa:"/sɪk/", pos:"adjective", level:1, vi:"ốm, bệnh", examples:[{en:"She is sick today.", vi:"Hôm nay cô ấy bị ốm."},{en:"He feels sick.", vi:"Anh ấy thấy không khỏe."}]},
  {id:949, word:"shy", ipa:"/ʃaɪ/", pos:"adjective", level:1, vi:"nhút nhát, e thẹn", examples:[{en:"The boy is very shy.", vi:"Cậu bé rất nhút nhát."},{en:"She felt shy at the party.", vi:"Cô ấy thấy e thẹn ở bữa tiệc."}]},
  {id:950, word:"smart", ipa:"/smɑːrt/", pos:"adjective", level:1, vi:"thông minh", examples:[{en:"She is a smart student.", vi:"Cô ấy là một học sinh thông minh."},{en:"That's a smart choice.", vi:"Đó là một lựa chọn khôn ngoan."}]},
  {id:951, word:"strange", ipa:"/streɪndʒ/", pos:"adjective", level:1, vi:"lạ, kỳ lạ", examples:[{en:"I heard a strange noise.", vi:"Tôi nghe một tiếng động lạ."},{en:"That is a strange story.", vi:"Đó là một câu chuyện kỳ lạ."}]},
  {id:952, word:"straight", ipa:"/streɪt/", pos:"adjective", level:1, vi:"thẳng", examples:[{en:"Draw a straight line.", vi:"Vẽ một đường thẳng."},{en:"Her hair is long and straight.", vi:"Tóc cô ấy dài và thẳng."}]},
  {id:953, word:"strict", ipa:"/strɪkt/", pos:"adjective", level:1, vi:"nghiêm khắc", examples:[{en:"Our teacher is strict.", vi:"Giáo viên của chúng tôi rất nghiêm."},{en:"They have strict rules.", vi:"Họ có những quy định nghiêm ngặt."}]},
  {id:954, word:"stupid", ipa:"/ˈstuːpɪd/", pos:"adjective", level:1, vi:"ngu ngốc, dại dột", examples:[{en:"That was a stupid idea.", vi:"Đó là một ý tưởng ngu ngốc."},{en:"Don't do anything stupid.", vi:"Đừng làm điều gì dại dột."}]},
  {id:955, word:"successful", ipa:"/səkˈsesfl/", pos:"adjective", level:1, vi:"thành công", examples:[{en:"She is a successful writer.", vi:"Cô ấy là một nhà văn thành công."},{en:"The party was successful.", vi:"Bữa tiệc đã thành công."}]},
  {id:956, word:"sudden", ipa:"/ˈsʌdn/", pos:"adjective", level:1, vi:"đột ngột, bất ngờ", examples:[{en:"There was a sudden change.", vi:"Có một sự thay đổi đột ngột."},{en:"His sudden arrival surprised us.", vi:"Sự xuất hiện bất ngờ của anh ấy làm chúng tôi ngạc nhiên."}]},
  {id:957, word:"sunny", ipa:"/ˈsʌni/", pos:"adjective", level:1, vi:"nắng, có nắng", examples:[{en:"It is a sunny day.", vi:"Hôm nay là một ngày nắng."},{en:"The weather is sunny and warm.", vi:"Thời tiết nắng và ấm áp."}]},
  {id:958, word:"rainy", ipa:"/ˈreɪni/", pos:"adjective", level:1, vi:"mưa, có mưa", examples:[{en:"It is a rainy morning.", vi:"Đó là một buổi sáng mưa."},{en:"I stay home on rainy days.", vi:"Tôi ở nhà vào những ngày mưa."}]},
  {id:959, word:"windy", ipa:"/ˈwɪndi/", pos:"adjective", level:1, vi:"có gió, lộng gió", examples:[{en:"It is windy today.", vi:"Hôm nay trời có gió."},{en:"The hill is very windy.", vi:"Ngọn đồi lộng gió."}]},
  {id:960, word:"snowy", ipa:"/ˈsnoʊi/", pos:"adjective", level:1, vi:"có tuyết, đầy tuyết", examples:[{en:"It was a snowy night.", vi:"Đó là một đêm đầy tuyết."},{en:"The mountains are snowy.", vi:"Những ngọn núi phủ tuyết."}]},
  {id:961, word:"wild", ipa:"/waɪld/", pos:"adjective", level:1, vi:"hoang dã, dại", examples:[{en:"Wild animals live in the forest.", vi:"Động vật hoang dã sống trong rừng."},{en:"We picked some wild flowers.", vi:"Chúng tôi hái vài bông hoa dại."}]},
  {id:962, word:"wise", ipa:"/waɪz/", pos:"adjective", level:1, vi:"khôn ngoan, sáng suốt", examples:[{en:"She is a wise old woman.", vi:"Bà ấy là một người phụ nữ già khôn ngoan."},{en:"That was a wise decision.", vi:"Đó là một quyết định sáng suốt."}]},
  {id:963, word:"wooden", ipa:"/ˈwʊdn/", pos:"adjective", level:1, vi:"bằng gỗ", examples:[{en:"They have a wooden table.", vi:"Họ có một cái bàn gỗ."},{en:"The toy is made of wooden blocks.", vi:"Món đồ chơi được làm từ những khối gỗ."}]},
  {id:964, word:"worried", ipa:"/ˈwɜːrid/", pos:"adjective", level:1, vi:"lo lắng, lo âu", examples:[{en:"She is worried about the test.", vi:"Cô ấy lo lắng về bài kiểm tra."},{en:"Don't be worried, it's okay.", vi:"Đừng lo, ổn cả mà."}]},
  {id:965, word:"weird", ipa:"/wɪrd/", pos:"adjective", level:1, vi:"kỳ quặc, kỳ dị", examples:[{en:"That is a weird sound.", vi:"Đó là một âm thanh kỳ quặc."},{en:"The food tastes weird.", vi:"Món ăn có vị kỳ kỳ."}]},
  {id:966, word:"wealthy", ipa:"/ˈwelθi/", pos:"adjective", level:1, vi:"giàu có, khá giả", examples:[{en:"He is a wealthy man.", vi:"Ông ấy là một người giàu có."},{en:"They come from a wealthy family.", vi:"Họ xuất thân từ một gia đình khá giả."}]},
  {id:967, word:"quick", ipa:"/kwɪk/", pos:"adjective", level:1, vi:"nhanh", examples:[{en:"Let's have a quick lunch.", vi:"Mình ăn trưa nhanh nhé."},{en:"She gave a quick answer.", vi:"Cô ấy trả lời nhanh."}]},
  {id:968, word:"rare", ipa:"/rer/", pos:"adjective", level:1, vi:"hiếm, hiếm có", examples:[{en:"This is a rare bird.", vi:"Đây là một loài chim hiếm."},{en:"It is rare to see snow here.", vi:"Hiếm khi thấy tuyết ở đây."}]},
  {id:969, word:"raw", ipa:"/rɔː/", pos:"adjective", level:1, vi:"sống, chưa nấu chín", examples:[{en:"Don't eat raw meat.", vi:"Đừng ăn thịt sống."},{en:"Some fish is eaten raw.", vi:"Một số loại cá được ăn sống."}]},
  {id:970, word:"real", ipa:"/riːl/", pos:"adjective", level:1, vi:"thật, có thật", examples:[{en:"Is this a real diamond?", vi:"Đây có phải kim cương thật không?"},{en:"That is a real story.", vi:"Đó là một câu chuyện có thật."}]},
  {id:971, word:"recent", ipa:"/ˈriːsnt/", pos:"adjective", level:1, vi:"gần đây, mới đây", examples:[{en:"This is a recent photo.", vi:"Đây là một tấm ảnh gần đây."},{en:"In recent years, the city has grown.", vi:"Những năm gần đây, thành phố đã phát triển."}]},
  {id:972, word:"regular", ipa:"/ˈreɡjələr/", pos:"adjective", level:1, vi:"thường xuyên, đều đặn; thông thường", examples:[{en:"He is a regular customer.", vi:"Anh ấy là khách quen."},{en:"Do regular exercise.", vi:"Hãy tập thể dục đều đặn."}]},
  {id:973, word:"ripe", ipa:"/raɪp/", pos:"adjective", level:1, vi:"chín (trái cây)", examples:[{en:"The bananas are ripe.", vi:"Chuối đã chín."},{en:"Pick the ripe tomatoes.", vi:"Hái những quả cà chua chín."}]},
  {id:974, word:"rough", ipa:"/rʌf/", pos:"adjective", level:1, vi:"thô ráp; gồ ghề", examples:[{en:"The wall feels rough.", vi:"Bức tường sờ vào thấy thô ráp."},{en:"The road is rough.", vi:"Con đường gồ ghề."}]},
  {id:975, word:"rude", ipa:"/ruːd/", pos:"adjective", level:1, vi:"thô lỗ, bất lịch sự", examples:[{en:"It is rude to interrupt.", vi:"Ngắt lời người khác là bất lịch sự."},{en:"Don't be rude to her.", vi:"Đừng thô lỗ với cô ấy."}]},
  {id:976, word:"slowly", ipa:"/ˈsloʊli/", pos:"adverb", level:1, vi:"chậm rãi, từ từ", examples:[{en:"Please speak slowly.", vi:"Vui lòng nói chậm lại."},{en:"He walked slowly.", vi:"Anh ấy đi chậm rãi."}]},
  {id:977, word:"quickly", ipa:"/ˈkwɪkli/", pos:"adverb", level:1, vi:"nhanh chóng, mau", examples:[{en:"She finished quickly.", vi:"Cô ấy làm xong nhanh chóng."},{en:"Come here quickly!", vi:"Mau lại đây!"}]},
  {id:978, word:"quietly", ipa:"/ˈkwaɪətli/", pos:"adverb", level:1, vi:"lặng lẽ, khẽ khàng", examples:[{en:"He closed the door quietly.", vi:"Anh ấy khẽ khàng đóng cửa."},{en:"Please sit quietly.", vi:"Vui lòng ngồi yên lặng."}]},
  {id:979, word:"carefully", ipa:"/ˈkerfəli/", pos:"adverb", level:1, vi:"cẩn thận, kỹ lưỡng", examples:[{en:"Drive carefully.", vi:"Lái xe cẩn thận nhé."},{en:"Read the question carefully.", vi:"Đọc kỹ câu hỏi."}]},
  {id:980, word:"finally", ipa:"/ˈfaɪnəli/", pos:"adverb", level:1, vi:"cuối cùng, rốt cuộc", examples:[{en:"Finally, we arrived home.", vi:"Cuối cùng, chúng tôi cũng về đến nhà."},{en:"She finally agreed.", vi:"Rốt cuộc cô ấy cũng đồng ý."}]},
  {id:981, word:"immediately", ipa:"/ɪˈmiːdiətli/", pos:"adverb", level:1, vi:"ngay lập tức", examples:[{en:"Call me immediately.", vi:"Gọi cho tôi ngay lập tức."},{en:"She left immediately.", vi:"Cô ấy rời đi ngay."}]},
  {id:982, word:"nearly", ipa:"/ˈnɪrli/", pos:"adverb", level:1, vi:"gần như, suýt", examples:[{en:"It is nearly midnight.", vi:"Gần nửa đêm rồi."},{en:"I nearly fell.", vi:"Tôi suýt ngã."}]},
  {id:983, word:"hardly", ipa:"/ˈhɑːrdli/", pos:"adverb", level:1, vi:"hầu như không", examples:[{en:"I can hardly believe it.", vi:"Tôi hầu như không thể tin nổi."},{en:"She hardly ever cooks.", vi:"Cô ấy hầu như không bao giờ nấu ăn."}]},
  {id:984, word:"mostly", ipa:"/ˈmoʊstli/", pos:"adverb", level:1, vi:"chủ yếu, phần lớn", examples:[{en:"The guests are mostly students.", vi:"Khách phần lớn là sinh viên."},{en:"I mostly drink tea.", vi:"Tôi chủ yếu uống trà."}]},
  {id:985, word:"lately", ipa:"/ˈleɪtli/", pos:"adverb", level:1, vi:"gần đây, dạo này", examples:[{en:"Have you seen her lately?", vi:"Dạo này bạn có gặp cô ấy không?"},{en:"I have been busy lately.", vi:"Dạo này tôi khá bận."}]},
  {id:986, word:"simply", ipa:"/ˈsɪmpli/", pos:"adverb", level:1, vi:"đơn giản là, chỉ là", examples:[{en:"It is simply too expensive.", vi:"Nó đơn giản là quá đắt."},{en:"Just explain it simply.", vi:"Cứ giải thích đơn giản thôi."}]},
  {id:987, word:"truly", ipa:"/ˈtruːli/", pos:"adverb", level:1, vi:"thật sự, thực lòng", examples:[{en:"I am truly sorry.", vi:"Tôi thực lòng xin lỗi."},{en:"She is truly kind.", vi:"Cô ấy thật sự tốt bụng."}]},
  {id:988, word:"widely", ipa:"/ˈwaɪdli/", pos:"adverb", level:1, vi:"rộng rãi, phổ biến", examples:[{en:"English is widely spoken.", vi:"Tiếng Anh được nói rộng rãi."},{en:"The book is widely read.", vi:"Cuốn sách được đọc phổ biến."}]},
  {id:989, word:"surely", ipa:"/ˈʃʊrli/", pos:"adverb", level:1, vi:"chắc chắn, hẳn là", examples:[{en:"Surely you are joking.", vi:"Chắc bạn đang đùa."},{en:"This will surely work.", vi:"Cái này chắc chắn sẽ hiệu quả."}]},
  {id:990, word:"nicely", ipa:"/ˈnaɪsli/", pos:"adverb", level:1, vi:"đẹp, tốt, tử tế", examples:[{en:"The room is nicely decorated.", vi:"Căn phòng được trang trí đẹp."},{en:"She asked nicely.", vi:"Cô ấy hỏi rất nhã nhặn."}]},
  {id:991, word:"highly", ipa:"/ˈhaɪli/", pos:"adverb", level:1, vi:"rất, cao độ", examples:[{en:"She is highly skilled.", vi:"Cô ấy có tay nghề rất cao."},{en:"This book is highly recommended.", vi:"Cuốn sách này rất đáng đọc."}]},
  {id:992, word:"mainly", ipa:"/ˈmeɪnli/", pos:"adverb", level:1, vi:"chủ yếu, phần lớn", examples:[{en:"We mainly eat rice.", vi:"Chúng tôi chủ yếu ăn cơm."},{en:"The crowd was mainly young people.", vi:"Đám đông phần lớn là người trẻ."}]},
  {id:993, word:"rarely", ipa:"/ˈrerli/", pos:"adverb", level:1, vi:"hiếm khi", examples:[{en:"He rarely watches TV.", vi:"Anh ấy hiếm khi xem tivi."},{en:"It rarely snows here.", vi:"Hiếm khi có tuyết ở đây."}]},
  {id:994, word:"firmly", ipa:"/ˈfɜːrmli/", pos:"adverb", level:1, vi:"chắc chắn, dứt khoát", examples:[{en:"Hold the rope firmly.", vi:"Giữ chặt sợi dây."},{en:"She firmly said no.", vi:"Cô ấy dứt khoát nói không."}]},
  {id:995, word:"gently", ipa:"/ˈdʒentli/", pos:"adverb", level:1, vi:"nhẹ nhàng, dịu dàng", examples:[{en:"Hold the baby gently.", vi:"Bế em bé nhẹ nhàng nhé."},{en:"She gently closed the door.", vi:"Cô ấy nhẹ nhàng khép cửa."}]},
  {id:996, word:"myself", ipa:"/maɪˈself/", pos:"pronoun", level:1, vi:"chính tôi, tự tôi", examples:[{en:"I made this cake myself.", vi:"Tôi tự làm cái bánh này."},{en:"I hurt myself.", vi:"Tôi tự làm mình bị đau."}]},
  {id:997, word:"yourself", ipa:"/jɔːrˈself/", pos:"pronoun", level:1, vi:"chính bạn, tự bạn", examples:[{en:"Take care of yourself.", vi:"Hãy chăm sóc bản thân nhé."},{en:"Did you do it yourself?", vi:"Bạn tự làm nó à?"}]},
  {id:998, word:"himself", ipa:"/hɪmˈself/", pos:"pronoun", level:1, vi:"chính anh ấy, tự anh ấy", examples:[{en:"He fixed the car himself.", vi:"Anh ấy tự sửa chiếc xe."},{en:"He lives by himself.", vi:"Anh ấy sống một mình."}]},
  {id:999, word:"herself", ipa:"/hɜːrˈself/", pos:"pronoun", level:1, vi:"chính cô ấy, tự cô ấy", examples:[{en:"She made it herself.", vi:"Cô ấy tự làm ra nó."},{en:"She looked at herself in the mirror.", vi:"Cô ấy nhìn mình trong gương."}]},
  {id:1000, word:"themselves", ipa:"/ðəmˈselvz/", pos:"pronoun", level:1, vi:"chính họ, tự họ", examples:[{en:"They built the house themselves.", vi:"Họ tự xây ngôi nhà."},{en:"The children enjoyed themselves.", vi:"Bọn trẻ chơi vui vẻ."}]}
];
const WORD_MAP = Object.fromEntries(WORDS.map(w=>[w.id,w]));

/* =================================================================
   1b) FIREBASE CONFIG — điền 6 giá trị sau khi tạo Firebase project
       (Hướng dẫn: console.firebase.google.com → Project settings → Web app)
   ================================================================= */
const FB_CFG = {
  apiKey:            "AIzaSyDhlDpLqN-lUsjIBE-lMw0srVgn3-7-bQQ",
  authDomain:        "english-app-cfd5d.firebaseapp.com",
  projectId:         "english-app-cfd5d",
  storageBucket:     "english-app-cfd5d.firebasestorage.app",
  messagingSenderId: "829270282426",
  appId:             "1:829270282426:web:062852b77391b413e13283"
};
const USE_FIREBASE = typeof firebase !== 'undefined' && FB_CFG.apiKey !== "FILL_IN";
let db = null, auth = null;
if (USE_FIREBASE) {
  firebase.initializeApp(FB_CFG);
  db   = firebase.firestore();
  auth = firebase.auth();
}

/* =================================================================
   1c) AZURE SPEECH CONFIG — chấm điểm phát âm
   ================================================================= */
const AZURE_KEY    = "BBWFrbBBOkHCng0Tc1ABRN14hve7LGr9Y0JCld5SyRbw1iraMdvOJQQJ99CEACi5YpzXJ3w3AAAYACOGnmY7";
const AZURE_REGION = "northeurope";
const USE_AZURE    = true;

/* =================================================================
   2) LỚP LƯU TRỮ — localStorage, tự chuyển sang bộ nhớ tạm
      nếu môi trường chặn (ví dụ trong artifact của Claude.ai)
   ================================================================= */
const Store = (() => {
  let ok = false, mem = {};
  try { const k="__t"; localStorage.setItem(k,"1"); localStorage.removeItem(k); ok=true; } catch(e){ ok=false; }
  return {
    available: ok,
    get(key, def){
      try{ const v = ok ? localStorage.getItem(key) : (key in mem ? mem[key] : null);
        return v==null ? def : JSON.parse(v); }catch(e){ return def; }
    },
    set(key, val){
      const s = JSON.stringify(val);
      try{ if(ok) localStorage.setItem(key,s); else mem[key]=s; }catch(e){ mem[key]=s; }
    }
  };
})();

/* =================================================================
   3) TRẠNG THÁI ỨNG DỤNG
   ================================================================= */
const todayStr = () => new Date().toISOString().slice(0,10);

let settings = Object.assign(
  { autoSpeak:true, autoSpeakExample:false, voiceLang:"en-US", theme:"light", dailyGoal:20 },
  Store.get("vocab_settings", {})
);
// progress[id] = {status:'new'|'learning'|'known', reps, ease, intervalDays, due(ts), last(ts)}
let progress = Store.get("vocab_progress", {});
let streak   = Store.get("vocab_streak", { count:0, lastDate:null });
let daily    = Store.get("vocab_daily",  { date:todayStr(), count:0 });
let currentUser = null;
let fsWriteTimer = null;

function saveAll(){
  Store.set("vocab_settings", settings);
  Store.set("vocab_progress", progress);
  Store.set("vocab_streak", streak);
  Store.set("vocab_daily", daily);
  if(currentUser){ clearTimeout(fsWriteTimer); fsWriteTimer = setTimeout(saveToFirestore, 2000); }
}

async function saveToFirestore(){
  if(!currentUser || !db) return;
  try{
    await db.doc(`users/${currentUser.uid}`).set(
      { settings, progress, streak, daily,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    );
  } catch(e){ /* offline — localStorage has the data */ }
}

async function loadFromFirestore(){
  if(!currentUser || !db) return;
  try{
    const snap = await db.doc(`users/${currentUser.uid}`).get();
    if(!snap.exists) return;
    const d = snap.data();
    if(d.progress){
      const merged = {...progress};
      for(const [id, remote] of Object.entries(d.progress)){
        const local = progress[id];
        if(!local || (remote.last||0) > (local.last||0)) merged[id] = remote;
      }
      progress = merged;
    }
    if(d.settings)  settings = Object.assign({...settings}, d.settings);
    if(d.streak)    streak   = d.streak;
    if(d.daily && d.daily.date === todayStr()) daily = d.daily;
    setTheme(settings.theme);
    Store.set("vocab_progress", progress);
    Store.set("vocab_settings", settings);
    Store.set("vocab_streak",   streak);
    Store.set("vocab_daily",    daily);
  } catch(e){ /* offline or error — use localStorage data */ }
}

// Trạng thái phiên học hiện tại (không cần lưu)
let view = "home";
let deck = [];        // mảng id từ trong bộ thẻ đang học
let pos = 0;          // vị trí thẻ hiện tại trong deck
let flipped = false;
let deckTitle = "";
let browseFilters = { q:"", level:0, pos:"all", status:"all" };
let deckDone = false;
let lastDeckKind = null;
const dailyMarked = new Set();

// Quiz state
let quizDeck = [], quizPos = 0, quizMode = "en_vi";
let quizAnswered = false, quizSelectedId = null, quizCorrectId = null;
let quizOptions = [], quizScore = { correct:0, total:0 };
let quizDone = false, lastQuizKind = null;

// Pronunciation assessment state
let isRecording    = false;
let mediaRecorder  = null;
let recordingStream = null;
let audioChunks    = [];
let recordingWordId = null;
let pronResult     = null;
let pronLoading    = false;

const P = id => progress[id] || { status:"new", reps:0, ease:2.5, intervalDays:0, due:0, last:0 };
const isKnown = id => P(id).status === "known";

/* =================================================================
   4) PHÁT ÂM — Web Speech API
   ================================================================= */
let voiceCache = [];
function loadVoices(){ try{ voiceCache = window.speechSynthesis.getVoices() || []; }catch(e){ voiceCache=[]; } }
if("speechSynthesis" in window){
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
function pickVoice(lang){
  if(!voiceCache.length) loadVoices();
  // ưu tiên đúng ngôn ngữ (en-US / en-GB), nếu không có thì lấy giọng en bất kỳ
  return voiceCache.find(v=>v.lang && v.lang.toLowerCase()===lang.toLowerCase())
      || voiceCache.find(v=>v.lang && v.lang.toLowerCase().startsWith(lang.slice(0,2)))
      || null;
}
function speak(text, btn){
  if(!("speechSynthesis" in window)){ toast("Trình duyệt không hỗ trợ phát âm 😕"); return; }
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = settings.voiceLang;
    const v = pickVoice(settings.voiceLang);
    if(v) u.voice = v;
    u.rate = 0.92;
    if(btn){ btn.classList.add("speaking"); u.onend = u.onerror = ()=>btn.classList.remove("speaking"); }
    window.speechSynthesis.speak(u);
  }catch(e){ toast("Không phát âm được 😕"); }
}

/* =================================================================
   5) LẶP LẠI NGẮT QUÃNG (SM-2 rút gọn)
      - "Đã thuộc" (good): giãn khoảng cách ôn dần ra
      - "Học lại" (again): đặt lại, cho xuất hiện lại sớm
   ================================================================= */
function review(id, quality){
  const p = Object.assign({}, P(id));
  const now = Date.now();
  if(quality === "again"){
    p.reps = 0; p.intervalDays = 0;
    p.ease = Math.max(1.3, p.ease - 0.2);
    p.due = now + 60*1000;            // hiện lại sau ~1 phút (trong phiên)
    p.status = "learning";
  }else{ // good
    if(p.reps === 0) p.intervalDays = 1;
    else if(p.reps === 1) p.intervalDays = 3;
    else p.intervalDays = Math.round(p.intervalDays * p.ease);
    p.ease = Math.min(2.8, p.ease + 0.08);
    p.reps += 1;
    p.due = now + p.intervalDays*24*60*60*1000;
    p.status = p.reps >= 2 ? "known" : "learning";
  }
  p.last = now;
  progress[id] = p;
  saveAll();
}
// cập nhật mục tiêu ngày + streak khi học
function bumpDaily(){
  const t = todayStr();
  if(daily.date !== t){ daily = { date:t, count:0 }; }
  daily.count += 1;
  // streak
  if(streak.lastDate !== t){
    const yest = new Date(Date.now()-86400000).toISOString().slice(0,10);
    streak.count = (streak.lastDate === yest) ? streak.count+1 : 1;
    streak.lastDate = t;
  }
}

/* =================================================================
   6) TẠO BỘ THẺ (deck)
   ================================================================= */
function startDeck(kind){
  lastDeckKind = kind; deckDone = false;
  if(kind === "all"){ deck = WORDS.map(w=>w.id); deckTitle = "Học tất cả"; }
  else if(kind === "review"){
    const now = Date.now();
    deck = WORDS.filter(w=>{ const p=P(w.id); return p.status==="learning" || (p.status==="known" && p.due<=now); })
                .map(w=>w.id);
    deckTitle = "Ôn từ chưa thuộc";
  }
  else { // level 1/2/3
    deck = WORDS.filter(w=>w.level===kind).map(w=>w.id);
    deckTitle = "Cấp độ " + kind;
  }
  pos = 0; flipped = false; view = "study";
  render();
}
function startSingle(id){
  deck = [id]; pos = 0; flipped = false; deckDone = false; deckTitle = "Xem từ"; view = "study"; render();
}

/* =================================================================
   QUIZ
   ================================================================= */
function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function generateDistractors(word, count=3){
  const mainPos = word.pos.split(/\s*\/\s*/)[0];
  let pool = WORDS.filter(w=>w.id!==word.id && w.level===word.level && w.pos.split(/\s*\/\s*/)[0]===mainPos);
  if(pool.length < count) pool = WORDS.filter(w=>w.id!==word.id && w.level===word.level);
  if(pool.length < count) pool = WORDS.filter(w=>w.id!==word.id);
  return shuffle(pool).slice(0, count);
}
function startQuiz(kind){
  lastQuizKind = kind; quizDone = false;
  quizScore = { correct:0, total:0 }; quizPos = 0;
  const CAP = 20;
  if(kind === "all"){
    quizDeck = shuffle(WORDS.map(w=>w.id)).slice(0, CAP);
    deckTitle = "Quiz — Tất cả";
  } else if(kind === "review"){
    const now = Date.now();
    let ids = WORDS.filter(w=>{ const p=P(w.id); return p.status==="learning"||(p.status==="known"&&p.due<=now); }).map(w=>w.id);
    if(!ids.length) ids = WORDS.map(w=>w.id);
    quizDeck = shuffle(ids).slice(0, CAP);
    deckTitle = "Quiz — Ôn từ";
  } else {
    quizDeck = shuffle(WORDS.filter(w=>w.level===kind).map(w=>w.id)).slice(0, CAP);
    deckTitle = "Quiz — Cấp độ " + kind;
  }
  prepareQuestion();
  view = "quiz"; render();
}
function prepareQuestion(){
  quizAnswered = false; quizSelectedId = null;
  const word = WORD_MAP[quizDeck[quizPos]];
  quizMode = Math.random() > 0.5 ? "en_vi" : "vi_en";
  quizCorrectId = word.id;
  quizOptions = shuffle([word, ...generateDistractors(word, 3)]);
}
function quizAnswer(selectedId){
  if(quizAnswered) return;
  quizAnswered = true; quizSelectedId = selectedId;
  const correct = selectedId === quizCorrectId;
  quizScore.total++;
  if(correct) quizScore.correct++;
  review(quizCorrectId, correct ? "good" : "again");
  if(!dailyMarked.has(quizCorrectId)){ bumpDaily(); dailyMarked.add(quizCorrectId); }
  render();
}
function quizNext(){
  cancelRecording();
  if(quizPos < quizDeck.length-1){ quizPos++; prepareQuestion(); render(); }
  else { quizDone = true; render(); }
}

/* ---------- MÀN HÌNH QUIZ ---------- */
function viewQuiz(){
  if(quizDone){
    const pct = quizScore.total ? Math.round(quizScore.correct/quizScore.total*100) : 0;
    const emoji = pct>=80?'🏆':pct>=50?'👍':'💪';
    const msg   = pct>=80?'Xuất sắc!':pct>=50?'Tốt lắm!':'Cố lên nhé!';
    const reArg = typeof lastQuizKind==='number' ? lastQuizKind : `'${lastQuizKind}'`;
    return `
      <div class="topbar"><button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button><h1 style="font-size:1.1rem">${deckTitle}</h1></div>
      <div class="empty-state" style="padding-top:50px">
        <div class="big">${emoji}</div>
        <b style="font-size:1.3rem">${msg}</b><br><br>
        <div style="font-size:2rem;font-weight:700;color:var(--accent)">${quizScore.correct}/${quizScore.total}</div>
        <div style="color:var(--ink-soft);margin-top:4px">câu đúng · ${pct}%</div>
        <div style="margin-top:28px;display:flex;flex-direction:column;gap:12px;max-width:280px;margin-left:auto;margin-right:auto">
          <button class="mark-btn mark-known" onclick="startQuiz(${reArg})">🔁 Quiz lại</button>
          <button class="nav-btn" onclick="go('home')" style="padding:14px">🏠 Về trang chính</button>
        </div>
      </div>`;
  }
  if(!quizDeck.length){
    return `<div class="topbar"><button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button><h1>Quiz</h1></div>
      <div class="empty-state"><div class="big">😅</div><b>Không có từ để quiz!</b></div>`;
  }
  const word = WORD_MAP[quizCorrectId];
  const total = quizDeck.length;
  const isEnVi = quizMode === "en_vi";
  const shortVi = w => esc(w.vi.split(/[—;]/)[0].trim());
  const answerBtns = quizOptions.map(opt=>{
    const label = isEnVi ? shortVi(opt) : esc(opt.word);
    let cls = 'quiz-btn';
    if(quizAnswered){
      if(opt.id===quizCorrectId)       cls += ' correct';
      else if(opt.id===quizSelectedId) cls += ' wrong';
      else                             cls += ' dimmed';
    }
    return `<button class="${cls}" onclick="quizAnswer(${opt.id})" ${quizAnswered?'disabled':''}>${label}</button>`;
  }).join('');
  return `
  <div class="study-head">
    <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button>
    <span class="deck-name">${deckTitle}</span>
    <span class="counter">${quizPos+1} / ${total}</span>
  </div>
  <div class="progress-track" style="margin-bottom:16px">
    <div class="progress-fill" style="width:${(quizPos+1)/total*100}%"></div>
  </div>
  <div class="quiz-question-card">
    ${isEnVi
      ? `<div class="quiz-word">${esc(word.word)}</div><div class="quiz-meta">${esc(word.ipa)} · ${esc(word.pos)}</div>`
      : `<div class="quiz-vi-q">${shortVi(word)}</div>`}
  </div>
  <div class="quiz-label">${isEnVi ? 'Nghĩa tiếng Việt là gì?' : 'Từ tiếng Anh là gì?'}</div>
  <div class="quiz-answers">${answerBtns}</div>
  ${quizAnswered
    ? `<div class="quiz-score-bar">${quizScore.correct}/${quizScore.total} câu đúng</div>
       <button class="mark-btn mark-known" onclick="quizNext()" style="width:100%">${quizPos<total-1?'Tiếp theo ›':'Xem kết quả 🏆'}</button>
       <div class="pronun-section">${recordBtn(quizCorrectId)}${viewPronResult(quizCorrectId)}</div>`
    : '<div class="quiz-score-bar">Chọn đáp án đúng</div>'}`;
}

/* =================================================================
   7) RENDER — vẽ giao diện theo trạng thái
   ================================================================= */
const app = document.getElementById("app");
const el = (html) => { const t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstChild; };

function setTheme(t){
  settings.theme = t;
  document.documentElement.setAttribute("data-theme", t);
  document.querySelector('meta[name=theme-color]').setAttribute("content", t==="dark" ? "#16140f" : "#f7f3ec");
}

/* =================================================================
   5b) FIREBASE AUTH
   ================================================================= */
/* =================================================================
   5c) PRONUNCIATION ASSESSMENT — Azure Speech REST API
   ================================================================= */
function cancelRecording(){
  if(mediaRecorder && mediaRecorder.state !== 'inactive'){
    mediaRecorder.onstop = null;
    mediaRecorder.stop();
  }
  if(recordingStream){ recordingStream.getTracks().forEach(t=>t.stop()); recordingStream=null; }
  isRecording=false; pronLoading=false; pronResult=null;
}

async function toggleRecording(wordId){
  if(isRecording){ stopRecording(); return; }
  await startRecording(wordId);
}

async function startRecording(wordId){
  try{
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    recordingStream = stream;
    audioChunks = [];
    recordingWordId = wordId;
    pronResult = null;
    pronLoading = false;

    const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus'
               : MediaRecorder.isTypeSupported('audio/webm')             ? 'audio/webm'
               : '';
    mediaRecorder = mime ? new MediaRecorder(stream, {mimeType:mime}) : new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => { if(e.data.size>0) audioChunks.push(e.data); };
    mediaRecorder.onstop = async () => {
      if(recordingStream){ recordingStream.getTracks().forEach(t=>t.stop()); recordingStream=null; }
      isRecording = false;
      pronLoading = true;
      updateRecordBtnDOM();
      const blob = new Blob(audioChunks, {type: mediaRecorder.mimeType||'audio/webm'});
      const word = WORD_MAP[recordingWordId];
      if(word){
        try{ pronResult = await assessPronunciation(word.word, blob, recordingWordId); }
        catch(e){ toast("Lỗi Azure: "+(e.message||e)); }
      }
      pronLoading = false;
      render();
    };

    mediaRecorder.start();
    isRecording = true;
    updateRecordBtnDOM();
    setTimeout(()=>{ if(isRecording) stopRecording(); }, 6000);

  }catch(e){
    if(e.name==='NotAllowedError') toast("Hãy cho phép truy cập microphone rồi thử lại.");
    else toast("Lỗi microphone: "+(e.message||e));
  }
}

function stopRecording(){
  if(!mediaRecorder || mediaRecorder.state==='inactive') return;
  mediaRecorder.stop();
}

function updateRecordBtnDOM(){
  document.querySelectorAll('.record-btn').forEach(btn=>{
    btn.textContent = isRecording ? '⏹ Dừng ghi' : pronLoading ? '⏳ Đang chấm...' : '🎙 Ghi âm phát âm';
    btn.classList.toggle('recording', isRecording);
    btn.disabled = pronLoading;
  });
}

async function assessPronunciation(word, blob, wordId){
  const cfg = btoa(unescape(encodeURIComponent(JSON.stringify({
    ReferenceText: word,
    GradingSystem: "HundredMark",
    Granularity: "FullText",
    EnableMiscue: false
  }))));
  const url = `https://${AZURE_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`;
  const res = await fetch(url, {
    method:'POST',
    headers:{
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': blob.type || 'audio/webm',
      'Pronunciation-Assessment': cfg
    },
    body: blob
  });
  if(!res.ok){ const t=await res.text(); throw new Error(`${res.status}: ${t.slice(0,120)}`); }
  const data = await res.json();
  const pa = data.NBest?.[0]?.PronunciationAssessment;
  if(data.RecognitionStatus !== 'Success' || !pa){
    return {wordId, score:0, accuracy:0, fluency:0, completeness:0, recognized:'', failed:true};
  }
  return {
    wordId,
    score:        Math.round(pa.PronScore),
    accuracy:     Math.round(pa.AccuracyScore),
    fluency:      Math.round(pa.FluencyScore),
    completeness: Math.round(pa.CompletenessScore),
    recognized:   (data.DisplayText||'').replace(/\.$/, '')
  };
}

function recordBtn(wordId){
  if(!USE_AZURE) return '';
  const active  = isRecording  && recordingWordId===wordId;
  const loading = pronLoading  && recordingWordId===wordId;
  const label   = active ? '⏹ Dừng ghi' : loading ? '⏳ Đang chấm...' : '🎙 Ghi âm phát âm';
  return `<button class="record-btn${active?' recording':''}" onclick="toggleRecording(${wordId})" ${loading?'disabled':''}>${label}</button>`;
}

function viewPronResult(wordId){
  if(!pronResult || pronResult.wordId!==wordId) return '';
  const r = pronResult;
  const color = r.score>=80?'var(--known)':r.score>=50?'var(--accent)':'var(--relearn)';
  const bar = v=>`<div class="pron-bar-track"><div class="pron-bar-fill" style="width:${v}%;background:${color}"></div></div>`;
  if(r.failed) return `<div class="pronun-result"><div class="pron-fail">Không nhận ra được từ 🎙 Thử lại nhé!</div></div>`;
  return `
  <div class="pronun-result">
    <div class="pron-header">
      <span class="pron-main" style="color:${color}">${r.score}<span class="pron-pct">%</span></span>
      <span class="pron-sublabel">Phát âm tổng</span>
    </div>
    <div class="pron-breakdown">
      <div class="pron-row"><span>Chính xác</span>${bar(r.accuracy)}<span class="pron-val">${r.accuracy}</span></div>
      <div class="pron-row"><span>Lưu loát</span>${bar(r.fluency)}<span class="pron-val">${r.fluency}</span></div>
      <div class="pron-row"><span>Đầy đủ</span>${bar(r.completeness)}<span class="pron-val">${r.completeness}</span></div>
    </div>
    ${r.recognized?`<div class="pron-recognized">Nghe được: "<b>${esc(r.recognized)}</b>"</div>`:''}
  </div>`;
}
function signInGoogle(){
  if(!auth) return;
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch(e => {
      if(e.code === 'auth/popup-blocked')
        toast("Popup bị chặn — hãy cho phép popup trong trình duyệt rồi thử lại.");
      else if(e.code !== 'auth/popup-closed-by-user')
        toast("Đăng nhập thất bại: " + (e.message || e.code));
    });
}

function doSignOut(){
  if(!auth) return;
  if(!confirm("Đăng xuất? Tiến độ đã được lưu trên server.")) return;
  clearTimeout(fsWriteTimer);
  auth.signOut().then(() => { currentUser = null; view = "login"; render(); });
}

function continueAsGuest(){ view = "home"; render(); }

async function initAuth(){
  setTheme(settings.theme);
  if(!USE_FIREBASE || !auth){ view = "home"; render(); return; }
  app.innerHTML = `<div class="loading-screen"><div class="loading-dot"></div></div>`;
  auth.onAuthStateChanged(async user => {
    currentUser = user;
    if(user) await loadFromFirestore();
    view = user ? "home" : "login";
    render();
  });
}

function render(){
  app.className = "app fade-in";
  if(view==="login")         app.innerHTML = viewLogin();
  else if(view==="home")        app.innerHTML = viewHome();
  else if(view==="study")  app.innerHTML = viewStudy();
  else if(view==="quiz")   app.innerHTML = viewQuiz();
  else if(view==="browse") app.innerHTML = viewBrowse();
  else if(view==="settings")app.innerHTML = viewSettings();
  // ép trình duyệt chạy lại animation
  void app.offsetWidth;
}

/* ---------- thống kê tổng ---------- */
function stats(){
  const total = WORDS.length;
  const known = WORDS.filter(w=>isKnown(w.id)).length;
  const learning = WORDS.filter(w=>P(w.id).status==="learning").length;
  const t = todayStr();
  const todayCount = daily.date===t ? daily.count : 0;
  return { total, known, learning, streak:streak.count, todayCount, goal:settings.dailyGoal };
}

/* ---------- MÀN HÌNH ĐĂNG NHẬP ---------- */
function viewLogin(){
  const googleBtn = USE_FIREBASE ? `
    <button class="google-btn" onclick="signInGoogle()">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Đăng nhập với Google
    </button>` : `<div class="app-note">Firebase chưa được cấu hình.</div>`;
  return `
  <div class="login-screen">
    <div class="login-logo">A</div>
    <div class="login-title">3000 Từ Vựng</div>
    <div class="login-sub">Đăng nhập để đồng bộ tiến độ học giữa điện thoại và máy tính.</div>
    ${googleBtn}
    <span class="guest-link" onclick="continueAsGuest()">Tiếp tục không đăng nhập →</span>
  </div>`;
}

/* ---------- MÀN HÌNH CHÍNH ---------- */
function viewHome(){
  const s = stats();
  const pct = s.total ? Math.round(s.known/s.total*100) : 0;
  const goalPct = Math.min(100, Math.round(s.todayCount/s.goal*100));
  const lvl = n => {
    const words = WORDS.filter(w=>w.level===n);
    const k = words.filter(w=>isKnown(w.id)).length;
    return { count:words.length, known:k, pct: words.length? Math.round(k/words.length*100):0 };
  };
  const l1=lvl(1), l2=lvl(2), l3=lvl(3);
  const levelRow = (emoji,title,desc,info,kind,special) => `
    <button class="level-btn ${special?'special':''}" onclick="startDeck(${typeof kind==='number'?kind:`'${kind}'`})">
      <div class="level-emoji">${emoji}</div>
      <div class="level-info">
        <span class="t">${title}</span>
        <span class="d">${desc}</span>
        ${info.count?`<div class="level-mini-track"><div class="level-mini-fill" style="width:${info.pct}%"></div></div>`:''}
      </div>
      <span class="level-chev">›</span>
    </button>`;

  return `
  <div class="topbar">
    <h1><span class="brand-dot"></span> 3000 Từ Vựng</h1>
    <button class="icon-btn" aria-label="Tìm kiếm" onclick="go('browse')" title="Tìm kiếm">🔍</button>
    <button class="icon-btn" aria-label="Cài đặt" onclick="go('settings')" title="Cài đặt">⚙️</button>
  </div>

  <div class="progress-wrap">
    <div class="progress-meta"><span>Tiến độ chung</span><span>${s.known}/${s.total} từ (${pct}%)</span></div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
  </div>

  <div class="hero">
    <div class="hero-title">Xin chào 👋</div>
    <div class="hero-sub">Học vài từ mới hôm nay nhé. Mỗi ngày một chút!</div>
    <div class="stat-row">
      <div class="stat"><div class="num known">${s.known}</div><div class="lbl">Đã thuộc</div></div>
      <div class="stat"><div class="num">${s.learning}</div><div class="lbl">Đang học</div></div>
      <div class="stat"><div class="num streak">${s.streak}🔥</div><div class="lbl">Ngày liên tục</div></div>
    </div>
  </div>

  <div class="goal-card">
    <div class="goal-top"><b>Mục tiêu hôm nay</b><span>${s.todayCount}/${s.goal} từ</span></div>
    <div class="progress-track"><div class="progress-fill" style="width:${goalPct}%"></div></div>
  </div>

  <div class="section-label">Học thẻ</div>
  <div class="level-grid">
    ${levelRow('🌱','Cấp độ 1','1000 từ thông dụng nhất',l1,1)}
    ${levelRow('🌿','Cấp độ 2','1000 từ mức trung bình',l2,2)}
    ${levelRow('🌳','Cấp độ 3','1000 từ nâng cao hơn',l3,3)}
    ${levelRow('📚','Học tất cả',`Toàn bộ ${s.total} từ hiện có`,{count:0},'all',true)}
    ${levelRow('🔁','Ôn từ chưa thuộc','Ưu tiên từ cần ôn lại',{count:0},'review',true)}
  </div>
  <div class="section-label" style="margin-top:20px">Trắc nghiệm</div>
  <div class="level-grid">
    <button class="level-btn" onclick="startQuiz('review')">
      <div class="level-emoji">🧠</div>
      <div class="level-info"><span class="t">Quiz từ đang học</span><span class="d">20 câu EN↔VI từ các từ đang ôn</span></div>
      <span class="level-chev">›</span>
    </button>
    <button class="level-btn special" onclick="startQuiz(1)">
      <div class="level-emoji">⚡</div>
      <div class="level-info"><span class="t">Quiz cấp độ 1</span><span class="d">20 câu ngẫu nhiên từ Level 1</span></div>
      <span class="level-chev">›</span>
    </button>
  </div>
  <div class="app-note" style="margin-top:22px">${currentUser?'☁️ Tiến độ đồng bộ qua tài khoản Google.':Store.available?'':'⚠️ Môi trường này không lưu được tiến độ lâu dài. Khi mở file trên điện thoại/máy tính thật, tiến độ sẽ được lưu tự động.'}</div>`;
}

/* ---------- MÀN HÌNH HỌC ---------- */
function viewStudy(){
  if(deckDone){
    const replayArg = typeof lastDeckKind==='number' ? lastDeckKind : `'${lastDeckKind}'`;
    return `
      <div class="topbar"><button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button><h1 style="font-size:1.1rem">${deckTitle}</h1></div>
      <div class="empty-state" style="padding-top:60px">
        <div class="big">🎉</div>
        <b style="font-size:1.3rem">Xong rồi!</b><br><br>
        <div style="color:var(--ink-soft)">Bạn đã học qua <b style="color:var(--ink)">${deck.length}</b> thẻ trong bộ này.</div>
        <div style="margin-top:28px;display:flex;flex-direction:column;gap:12px;max-width:280px;margin-left:auto;margin-right:auto">
          <button class="mark-btn mark-known" onclick="startDeck(${replayArg})">🔁 Học lại bộ này</button>
          <button class="nav-btn" onclick="go('home')" style="padding:14px">🏠 Về trang chính</button>
        </div>
      </div>`;
  }
  if(!deck.length){
    return `
      <div class="topbar"><button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button><h1 style="font-size:1.1rem">${deckTitle}</h1></div>
      <div class="empty-state"><div class="big">🎉</div><b>Không có thẻ nào ở đây!</b><br>
      ${deckTitle==='Ôn từ chưa thuộc'?'Bạn đã ôn hết các từ cần học rồi. Quá giỏi!':'Hãy thêm từ vào danh sách hoặc chọn nội dung khác.'}</div>`;
  }
  const id = deck[pos];
  const w = WORD_MAP[id];
  const st = P(id).status;
  const total = deck.length;
  const statusBadge = st==="known" ? `<span class="status-dot status-known">đã thuộc</span>`
                    : st==="learning" ? `<span class="status-dot status-learning">đang học</span>` : "";
  const exHtml = w.examples.map((e,i)=>`
      <div class="example">
        <div class="ex-text"><div class="ex-en">${esc(e.en)}</div><div class="ex-vi">${esc(e.vi)}</div></div>
        <button class="speak-sm" aria-label="Nghe phát âm câu ví dụ" onclick="event.stopPropagation();speak('${jsEsc(e.en)}',this)">🔊</button>
      </div>`).join("");

  return `
  <div class="study-head">
    <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')" title="Về trang chính">‹</button>
    <span class="deck-name">${deckTitle}</span>
    <span class="counter">Thẻ ${pos+1} / ${total}</span>
  </div>
  <div class="progress-track" style="margin-bottom:16px"><div class="progress-fill" style="width:${(pos+1)/total*100}%"></div></div>

  <div class="card-stage" id="stage">
    <div class="card ${flipped?'is-flipped':''}" id="card" onclick="toggleFlip()">
      <!-- MẶT TRƯỚC -->
      <div class="face front">
        ${statusBadge}
        <span class="pos-pill">${esc(w.pos)}</span>
        <div class="word">${esc(w.word)}</div>
        <div class="ipa">${esc(w.ipa)}</div>
        <button class="speak-big" aria-label="Nghe phát âm từ" onclick="event.stopPropagation();speak('${jsEsc(w.word)}',this)" title="Nghe phát âm">🔊</button>
        <div class="flip-hint">Chạm để lật • Space để xem nghĩa</div>
      </div>
      <!-- MẶT SAU -->
      <div class="face back">
        <div class="head-row">
          <div style="flex:1">
            <div class="word-sm">${esc(w.word)}</div>
            <div class="ipa-sm">${esc(w.ipa)} · ${esc(w.pos)}</div>
          </div>
          <button class="speak-sm" aria-label="Nghe phát âm từ" onclick="event.stopPropagation();speak('${jsEsc(w.word)}',this)">🔊</button>
        </div>
        <div class="vi-meaning">${esc(w.vi)}</div>
        <div class="divider"></div>
        <div class="ex-label">Ví dụ</div>
        ${exHtml}
      </div>
    </div>
  </div>

  ${flipped ? `<div class="pronun-section">${recordBtn(w.id)}${viewPronResult(w.id)}</div>` : ''}

  <div class="study-controls">
    <div class="mark-row">
      <button class="mark-btn mark-relearn" onclick="mark('again')">🔁 Học lại</button>
      <button class="mark-btn mark-known" onclick="mark('good')">✅ Đã thuộc</button>
    </div>
    <div class="nav-row">
      <button class="nav-btn" onclick="prev()" ${pos===0?'disabled':''}>‹ Trước</button>
      <button class="nav-btn" onclick="next()" ${pos>=total-1?'disabled':''}>Sau ›</button>
    </div>
  </div>`;
}

/* ---------- MÀN HÌNH TÌM KIẾM / DUYỆT ---------- */
function viewBrowse(){
  const f = browseFilters;
  const q = f.q.trim().toLowerCase();
  let list = WORDS.filter(w=>{
    if(f.level && w.level!==f.level) return false;
    if(f.pos!=="all" && !w.pos.toLowerCase().split(/\s*\/\s*/).includes(f.pos)) return false;
    if(f.status==="known" && !isKnown(w.id)) return false;
    if(f.status==="unknown" && isKnown(w.id)) return false;
    if(q && !(w.word.toLowerCase().includes(q) || w.vi.toLowerCase().includes(q))) return false;
    return true;
  });
  const rows = list.slice(0,300).map(w=>{
    const st = P(w.id).status;
    const cls = st==="known"?"known":st==="learning"?"learning":"";
    return `<div class="word-row" onclick="startSingle(${w.id})">
        <span class="wr-status ${cls}"></span>
        <div class="wr-main">
          <span class="wr-word">${esc(w.word)}</span>
          <span style="color:var(--ink-soft);font-size:.8rem"> · L${w.level}</span>
        </div>
        <span class="wr-vi">${esc(w.vi.split('—')[0])}</span>
      </div>`;
  }).join("");

  const chip = (label,active,onclick)=>`<button class="chip ${active?'active':''}" onclick="${onclick}">${label}</button>`;
  return `
  <div class="topbar">
    <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button>
    <h1 style="font-size:1.2rem">Tìm kiếm & Lọc</h1>
  </div>
  <div class="search-box">
    <span class="s-icon">🔍</span>
    <input id="searchInput" placeholder="Tìm theo tiếng Anh hoặc tiếng Việt..." value="${esc(f.q)}"
      oninput="browseFilters.q=this.value; refreshList()">
  </div>
  <div class="filters">
    ${chip('Tất cả cấp',f.level===0,"setFilter('level',0)")}
    ${chip('Cấp 1',f.level===1,"setFilter('level',1)")}
    ${chip('Cấp 2',f.level===2,"setFilter('level',2)")}
    ${chip('Cấp 3',f.level===3,"setFilter('level',3)")}
    ${chip('Danh từ',f.pos==='noun',"setFilter('pos','noun')")}
    ${chip('Động từ',f.pos==='verb',"setFilter('pos','verb')")}
    ${chip('Tính từ',f.pos==='adjective',"setFilter('pos','adjective')")}
    ${chip('Mọi loại từ',f.pos==='all',"setFilter('pos','all')")}
    ${chip('Đã thuộc',f.status==='known',"setFilter('status','known')")}
    ${chip('Chưa thuộc',f.status==='unknown',"setFilter('status','unknown')")}
    ${chip('Mọi trạng thái',f.status==='all',"setFilter('status','all')")}
  </div>
  <div class="result-count" id="resultCount">${list.length} từ</div>
  <div class="word-list" id="wordList">${rows || '<div class="empty-state">Không tìm thấy từ nào 🤔</div>'}</div>`;
}

/* ---------- MÀN HÌNH CÀI ĐẶT ---------- */
function viewSettings(){
  const s = settings;
  const seg = (val,opts) => `<div class="seg">${opts.map(o=>`<button class="${val===o.v?'active':''}" onclick="${o.fn}">${o.t}</button>`).join("")}</div>`;
  return `
  <div class="topbar">
    <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button>
    <h1 style="font-size:1.2rem">Cài đặt</h1>
  </div>

  ${currentUser ? `
  <div class="section-label">Tài khoản</div>
  <div class="setting-card">
    <div class="setting-row">
      <div class="s-info">
        <div class="s-title">${esc(currentUser.displayName||'Người dùng')}</div>
        <div class="s-desc">${esc(currentUser.email||'')}</div>
      </div>
      ${currentUser.photoURL?`<img src="${esc(currentUser.photoURL)}" width="38" height="38" style="border-radius:50%;border:1.5px solid var(--line);flex-shrink:0">`:``}
    </div>
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Đồng bộ dữ liệu</div><div class="s-desc">Tiến độ tự động lưu lên Google</div></div>
      <span style="color:var(--known);font-size:.85rem;font-weight:600">● Đang bật</span>
    </div>
  </div>
  <button class="data-btn danger" style="margin-bottom:8px" onclick="doSignOut()">🚪 Đăng xuất</button>
  ` : USE_FIREBASE ? `
  <div class="section-label">Tài khoản</div>
  <button class="google-btn" style="max-width:100%;margin-bottom:16px" onclick="signInGoogle()">
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
    Đăng nhập để đồng bộ tiến độ
  </button>
  ` : ``}

  <div class="section-label">Phát âm</div>
  <div class="setting-card">
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Tự động đọc khi mở thẻ</div><div class="s-desc">Đọc từ ngay khi xem thẻ mới</div></div>
      <label class="toggle"><input type="checkbox" ${s.autoSpeak?'checked':''} onchange="settings.autoSpeak=this.checked;saveAll()"><span class="track"></span></label>
    </div>
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Tự động đọc cả câu ví dụ</div><div class="s-desc">Khi lật ra mặt sau, đọc luôn ví dụ đầu tiên</div></div>
      <label class="toggle"><input type="checkbox" ${s.autoSpeakExample?'checked':''} onchange="settings.autoSpeakExample=this.checked;saveAll()"><span class="track"></span></label>
    </div>
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Giọng đọc</div><div class="s-desc">Chọn giọng Anh-Mỹ hoặc Anh-Anh</div></div>
      ${seg(s.voiceLang,[{v:'en-US',t:'US 🇺🇸',fn:"settings.voiceLang='en-US';saveAll();render()"},{v:'en-GB',t:'UK 🇬🇧',fn:"settings.voiceLang='en-GB';saveAll();render()"}])}
    </div>
  </div>

  <div class="section-label">Giao diện</div>
  <div class="setting-card">
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Chế độ màu</div><div class="s-desc">Nền sáng hoặc nền tối (học ban đêm)</div></div>
      ${seg(s.theme,[{v:'light',t:'☀️ Sáng',fn:"applyTheme('light')"},{v:'dark',t:'🌙 Tối',fn:"applyTheme('dark')"}])}
    </div>
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Mục tiêu mỗi ngày</div><div class="s-desc">Số từ muốn học mỗi ngày</div></div>
      <input class="goal-input" type="number" min="5" max="200" value="${s.dailyGoal}" onchange="settings.dailyGoal=Math.max(1,parseInt(this.value)||20);saveAll()">
    </div>
  </div>

  <div class="section-label">Dữ liệu & Tiến độ</div>
  <div class="setting-card" style="padding:16px 16px 6px">
    <button class="data-btn" onclick="exportProgress()">⬇️ Xuất tiến độ ra file JSON</button>
    <button class="data-btn" onclick="document.getElementById('importFile').click()">⬆️ Nhập tiến độ từ file JSON</button>
    <input type="file" id="importFile" accept="application/json" class="hidden" onchange="importProgress(event)">
    <button class="data-btn danger" onclick="resetProgress()">🗑️ Đặt lại toàn bộ tiến độ</button>
  </div>

  <div class="app-note">
    Hiện có <b>${WORDS.length}</b> từ trong ứng dụng.<br>
    Tiến độ ${currentUser?'đồng bộ qua tài khoản Google.':Store.available?'được lưu tự động trên thiết bị này.':'tạm thời (môi trường này không lưu được lâu dài).'}
  </div>`;
}

/* =================================================================
   8) HÀNH ĐỘNG NGƯỜI DÙNG
   ================================================================= */
function go(v){ cancelRecording(); view=v; render(); }
function toggleFlip(){
  flipped = !flipped;
  const c = document.getElementById("card");
  if(c) c.classList.toggle("is-flipped", flipped);
  // tự đọc câu ví dụ khi lật ra mặt sau (nếu bật)
  if(flipped && settings.autoSpeakExample){
    const w = WORD_MAP[deck[pos]];
    if(w && w.examples[0]) setTimeout(()=>speak(w.examples[0].en),350);
  }
}
function next(){ if(pos<deck.length-1){ cancelRecording(); pos++; flipped=false; render(); autoSpeak(); } }
function prev(){ if(pos>0){ cancelRecording(); pos--; flipped=false; render(); autoSpeak(); } }
function autoSpeak(){
  if(settings.autoSpeak){ const w=WORD_MAP[deck[pos]]; if(w) setTimeout(()=>speak(w.word),250); }
}
function mark(quality){
  cancelRecording();
  const id = deck[pos];
  review(id, quality);
  if(!dailyMarked.has(id)){ bumpDaily(); dailyMarked.add(id); }
  toast(quality==='good' ? '✅ Đã đánh dấu thuộc' : '🔁 Sẽ ôn lại sớm');
  setTimeout(()=>{ if(pos<deck.length-1){ next(); } else { deckDone=true; render(); } }, 250);
}
function applyTheme(t){ setTheme(t); saveAll(); render(); }

/* tìm kiếm: cập nhật danh sách mà không vẽ lại cả trang (giữ ô nhập) */
function setFilter(key,val){ browseFilters[key]=val; render(); setTimeout(()=>{const i=document.getElementById('searchInput'); if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);}},0); }
function refreshList(){
  const f=browseFilters, q=f.q.trim().toLowerCase();
  const list = WORDS.filter(w=>{
    if(f.level && w.level!==f.level) return false;
    if(f.pos!=="all" && !w.pos.toLowerCase().split(/\s*\/\s*/).includes(f.pos)) return false;
    if(f.status==="known" && !isKnown(w.id)) return false;
    if(f.status==="unknown" && isKnown(w.id)) return false;
    if(q && !(w.word.toLowerCase().includes(q)||w.vi.toLowerCase().includes(q))) return false;
    return true;
  });
  const wl=document.getElementById("wordList"), rc=document.getElementById("resultCount");
  if(rc) rc.textContent = list.length+" từ";
  if(wl) wl.innerHTML = list.slice(0,300).map(w=>{
    const st=P(w.id).status, cls=st==="known"?"known":st==="learning"?"learning":"";
    return `<div class="word-row" onclick="startSingle(${w.id})"><span class="wr-status ${cls}"></span><div class="wr-main"><span class="wr-word">${esc(w.word)}</span><span style="color:var(--ink-soft);font-size:.8rem"> · L${w.level}</span></div><span class="wr-vi">${esc(w.vi.split('—')[0])}</span></div>`;
  }).join("") || '<div class="empty-state">Không tìm thấy từ nào 🤔</div>';
}

/* xuất / nhập / xóa tiến độ */
function exportProgress(){
  const data = { progress, streak, daily, settings, exportedAt:new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
  a.download="tien-do-tu-vung.json"; a.click(); URL.revokeObjectURL(a.href);
  toast("Đã xuất file tiến độ");
}
function importProgress(ev){
  const file = ev.target.files[0]; if(!file) return;
  const r = new FileReader();
  r.onload = () => { try{
    const d = JSON.parse(r.result);
    if(d.progress) progress = d.progress;
    if(d.streak) streak = d.streak;
    if(d.daily) daily = d.daily;
    if(d.settings) settings = Object.assign(settings, d.settings);
    setTheme(settings.theme); saveAll(); render(); toast("Đã nhập tiến độ thành công");
  }catch(e){ toast("File không hợp lệ 😕"); } };
  r.readAsText(file);
}
function resetProgress(){
  if(confirm("Đặt lại toàn bộ tiến độ học? Hành động này không thể hoàn tác.")){
    progress={}; streak={count:0,lastDate:null}; daily={date:todayStr(),count:0};
    saveAll(); render(); toast("Đã đặt lại tiến độ");
  }
}

/* =================================================================
   9) TIỆN ÍCH
   ================================================================= */
function esc(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function jsEsc(s){ return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;'); }
let toastTimer;
function toast(msg){
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("show"),1800);
}

/* =================================================================
   10) PHÍM TẮT (desktop) + VUỐT (mobile)
   ================================================================= */
document.addEventListener("keydown", e=>{
  if(view!=="study") return;
  if(e.code==="Space"){ e.preventDefault(); toggleFlip(); }
  else if(e.code==="ArrowRight"){ next(); }
  else if(e.code==="ArrowLeft"){ prev(); }
  else if(e.key==="1"){ mark('again'); }
  else if(e.key==="2"){ mark('good'); }
});
// vuốt trái/phải trên mobile
let touchX=0, touchY=0;
document.addEventListener("touchstart", e=>{ if(view!=="study")return; touchX=e.touches[0].clientX; touchY=e.touches[0].clientY; }, {passive:true});
document.addEventListener("touchend", e=>{
  if(view!=="study") return;
  const dx=e.changedTouches[0].clientX-touchX, dy=e.changedTouches[0].clientY-touchY;
  if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)){ if(dx<0) next(); else prev(); }
}, {passive:true});

/* =================================================================
   11) KHỞI ĐỘNG
   ================================================================= */
initAuth();
