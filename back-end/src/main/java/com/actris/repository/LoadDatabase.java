package com.actris.repository;

import java.sql.Timestamp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.actris.exception.RankingNotFoundException;
import com.actris.model.Ranking;
import com.actris.model.Replay;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class LoadDatabase {

	@Bean
	CommandLineRunner initDatabase(RankingRepository rankingRepository, ReplayRepository replayRepository) {
		return args -> {
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("키보드힌트맨").score(133210).note("힌트점수 너프 전에 꿀빨기").replay_id(1L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김동주").score(4000).note("☞플레이데이터 귀요미☜").replay_id(2L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("양희영").score(3000).note("서른에꿈이생겼다..액트리스정복★").replay_id(3L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("오나영").score(2000).note("텐텐 ㄱㄱ??").replay_id(4L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김문희").score(1000).note("호박고구마아").replay_id(5L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("침착맨").score(1898).note("킹받네").replay_id(6L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("S2민트oO").score(3732).note("><안녕하세염").replay_id(7L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			
			
			
			
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 2371 0 69 0 2 141 0 2 147 0 2 152 0 2 171 4 16 236 3 16 258 0 1 266 0 1 272 0 1 278 0 1 286 0 1 295 2 16 319 0 1 340 0 1 354 3 16 409 4 16 438 0 4 451 0 2 458 0 2 479 1 16 500 0 1 509 0 1 515 0 1 525 0 8 535 0 1 542 0 1 546 0 1 553 0 1 557 5 16 577 0 2 583 0 2 591 0 4 598 0 2 613 2 16 639 0 1 646 0 1 652 0 1 657 0 1 663 0 1 671 0 1 678 6 16 728 5 16 753 0 2 761 0 4 770 0 2 778 0 2 784 0 2 788 0 2 797 2 16 820 0 1 825 0 4 834 0 1 858 6 16 904 0 4 926 0 4 948 1 16 993 1 64 1025 0 1 1029 0 4 1042 0 1 1052 0 4 1057 0 1 1065 0 1 1073 0 1 1080 2 16 1105 0 2 1116 0 2 1122 0 2 1130 0 2 1137 0 4 1155 0 4 1173 3 16 1221 0 64 1245 0 2 1251 0 2 1258 0 2 1264 0 2 1272 1 16 1297 0 1 1302 0 1 1309 0 1 1316 0 1 1323 0 1 1330 0 16 1371 2 16 1387 0 1 1394 0 1 1408 0 16 1430 0 2 1437 0 2 1443 0 2 1459 0 16 1483 0 1 1494 0 4 1506 0 2 1513 0 2 1529 0 2 1539 6 16 1563 0 1 1570 0 1 1579 0 4 1586 0 4 1600 0 1 1615 4 16 1646 0 2 1656 0 2 1698 0 64 1717 0 2 1727 0 1 1734 0 1 1751 0 2 1762 1 16 1786 0 2 1793 0 2 1803 0 8 1809 0 2 1814 0 2 1819 0 2 1829 1 16 1859 0 1 1870 0 1 1876 0 64 1909 0 1 1916 0 4 1924 0 1 1930 0 1 1936 0 1 1949 1 16 1965 0 1 1987 0 64 2017 0 1 2022 0 1 2032 0 1 2048 4 16 2075 0 2 2080 0 2 2086 0 2 2101 4 16 2119 0 1 2128 0 1 2143 0 64 2163 0 1 2172 0 1 2180 0 1 2207 6 16 2261 1 16 2288 0 2 2305 6 16 2325 0 2 2332 0 8 2338 0 2 2346 0 2 2353 0 2 2360 5 16 2377 0 1 2386 0 1 2393 0 4 2404 0 4 2414 0 4 2429 0 4 2438 0 4 2457 0 4 2465 0 1 2486 4 16 2510 0 1 2517 0 1 2538 0 2 2544 0 2 2551 0 2 2568 5 16 2591 0 1 2599 0 4 2606 0 4 2625 0 1 2635 5 16 2652 0 1 2661 0 1 2668 0 4 2676 0 4 2691 0 1 2698 1 16 2721 0 2 2728 0 2 2732 0 8 2739 0 2 2754 0 1 2764 5 16 2781 0 1 2796 0 4 2803 0 4 2811 0 2 2826 2 16 2849 0 2 2857 0 2 2863 0 4 2870 0 4 2879 0 2 2886 0 2 2894 2 16 2916 0 1 2925 0 1 2947 5 16 3002 0 64 3042 0 1 3049 0 1 3056 0 1 3063 0 1 3070 0 1 3081 5 16 3099 0 2 3106 0 2 3113 0 4 3117 0 2 3124 0 2 3134 0 2 3140 1 16 3179 0 2 3189 0 16 3254 0 1 3297 0 8 3304 0 2 3312 0 2 3318 0 2 3324 0 2 3337 0 1 3347 3 16 3367 0 1 3380 0 4 3421 0 4 3434 0 4 3442 0 4 3455 0 1 3482 0 1 3514 2 16 3583 0 1 3594 0 64 3614 0 1 3620 0 4 3627 0 4 3639 0 1 3645 0 1 3651 0 1 3657 0 1 3664 0 1 3669 6 16 3698 0 4 3791 0 64 3801 0 2 3809 0 2 3816 0 2 3821 0 2 3830 0 2 3836 0 2 3843 0 2 3848 2 16 3895 0 1 3910 0 2 3921 5 16 3950 0 1 3991 0 64 4021 0 4 4036 0 1 4048 0 2 4063 3 16 4122 0 8 4134 0 1 4155 0 1 4156 0 1 4157 0 1 4158 0 1 4159 0 1 4160 0 1 4161 0 1 4162 0 1 4163 0 1 4164 0 1 4165 0 1 4166 0 1 4167 0 1 4168 0 1 4173 1 16 4213 0 2 4223 0 2 4230 0 2 4237 0 2 4244 0 2 4252 3 16 4291 0 8 4312 5 16 4332 0 1 4343 0 1 4351 0 4 4357 0 1 4376 2 16 4410 0 64 4436 0 2 4442 0 8 4468 2 16 4486 0 1 4496 0 4 4513 0 1 4529 5 16 4559 0 2 4567 0 2 4574 0 2 4582 0 2 4684 2 16 4712 0 1 4722 0 4 4729 0 4 4754 5 16 4777 0 1 4781 0 1 4786 0 8 4793 0 1 4801 0 1 4809 0 1 4816 0 1 4823 0 1 4830 0 16 4866 0 2 4877 0 2 4890 0 16 4909 0 1 4931 4 16 4959 0 64 4974 0 1 4986 0 1 4994 0 1 5015 4 16 5041 0 2 5086 0 64 5107 0 2 5111 0 4 5115 0 2 5122 0 2 5128 0 2 5135 0 2 5141 0 2 5145 1 16 5187 0 4 5189 0 1 5199 0 1 5208 0 1 5215 0 1 5221 0 1 5229 0 1 5235 5 16 5275 0 64 5295 0 1 5302 0 4 5311 0 1 5329 0 2 5339 6 16 5374 0 2 5395 0 1 5411 0 16 5438 0 1 5444 0 1 5449 0 1 5462 1 16 5496 0 64 5516 0 2 5571 5 16 5597 0 1 5612 0 2 5621 0 2 5630 0 64 5653 0 2 5659 0 4 5681 0 8 5703 0 4 5724 0 8 5738 0 8 5750 0 8 5759 0 2 5766 0 2 5772 0 2 5777 3 16 5811 0 64 5841 0 4 5848 0 4 5856 0 1 5876 0 1 5884 3 16 5923 0 64 5947 0 4 5954 0 1 5961 0 1 5967 0 1 5974 0 1 5981 0 1 5987 0 1 5994 0 16 6031 0 2 6037 0 2 6044 0 2 6051 0 2 6055 0 2 6061 5 16 6112 0 2 6125 3 16 6147 0 1 6164 0 2 6175 0 16 6197 0 1 6222 0 64 6261 0 1 6273 0 1 6297 6 16 6335 0 2 6343 0 2 6396 0 64 6416 0 1 6424 0 1 6432 0 8 6441 0 1 6447 0 1 6462 5 16 6491 0 2 6498 0 4 6504 0 2 6510 0 2 6517 0 2 6527 1 16 6575 0 64 6599 0 1 6605 0 4 6612 0 4 6623 0 2 6644 3 16 6693 0 64 6717 0 8 6729 0 8 6747 0 8 6748 0 4 6781 0 4 6791 0 2 6798 0 2 6814 3 16 6836 0 1 6857 0 8 6872 0 1 6879 0 1 6901 0 1 6918 0 2 6942 5 16 6971 0 64 7009 0 1 7027 0 4 7040 0 4 7055 0 4 7062 0 1 7069 0 1 7075 0 1 7080 0 1 7087 0 1 7104 2 16 7153 0 64 7192 0 2 7224 4 16 7257 0 4 7261 0 2 7268 0 2 7275 0 2 7281 0 2 7287 0 2 7293 0 2 7299 5 16 7315 0 1 7344 0 64 7364 0 1 7372 0 4 7404 3 16 7427 0 1 7434 0 4 7440 0 4 7450 0 4 7465 0 4 7475 0 4 7490 0 4 7501 0 1 7507 0 1 7514 0 1 7521 0 1 7531 0 16 7578 0 64 7609 0 2 7624 1 16 7650 0 1 7655 0 4 7663 0 4 7672 0 2 7691 3 16 7723 0 2 7724 0 4 7732 0 2 7740 0 2 7746 0 2 7754 0 2 7760 0 2 7765 0 2 7771 1 16 7790 0 1 7802 0 1 7810 0 1 7817 0 1 7825 0 1 7833 4 16 7900 0 64 7916 0 1 7927 0 8 7934 0 1 7963 0 16 7992 0 1 8000 0 1 8008 0 1 8028 0 16 8054 0 2 8061 0 2 8075 0 1 8088 2 16 8118 0 8 8122 0 1 8130 0 1 8136 0 1 8142 0 1 8148 0 1 8154 0 1 8161 0 16 8204 0 2 8212 0 2 8219 0 8 8225 0 2 8232 0 2 8239 0 2 8246 0 2 8255 1 16 8291 0 8 8298 0 2 8307 0 2 8324 6 16 8354 0 1 8364 0 1 8383 0 2 8390 0 2 8397 0 2 8414 0 1 8429 5 16 8448 0 1 8458 0 1 8465 0 2 8486 0 2 8496 0 8 8503 0 2 8509 0 2 8517 0 2 8530 3 16 8554 0 1 8563 0 1 8573 0 1 8593 0 2 8616 0 16 8638 0 1 8695 0 4 8702 0 4 8721 0 4 8728 0 1 8734 0 1 8742 0 1 8749 0 1 8757 0 1 8765 5 16 8802 0 2 8811 0 4 8819 0 4 8829 0 2 8848 0 16 8880 0 4 8897 0 1 8912 0 16 8940 0 2 8949 0 8 8956 0 2 8963 0 2 8969 0 2 8976 0 2 8982 0 2 8988 5 16 9013 0 4 9019 0 4 9027 0 2 9085 1 16 9115 0 1 9118 0 4 9126 0 1 9147 5 16 9176 0 2 9184 0 8 9190 0 2 9200 0 2 9221 5 16 9243 0 1 9250 0 4 9258 0 4 9277 0 4 9285 0 4 9302 0 1 9309 0 1 9317 0 4 9324 0 1 9333 0 1 9344 4 16 9369 0 2 9375 0 2 9393 6 16 9409 0 1 9439 2 16 9460 0 1 9469 0 4 9500 5 16 9518 0 1 9530 0 8 9534 0 1 9542 0 1 9549 0 1 9556 0 1 9563 0 1 9570 0 16 9599 0 2 9617 6 16 9667 0 64 9687 0 2 9694 0 2 9701 0 2 9706 0 2 9712 0 2 9721 0 16 9744 0 1 9752 0 4 9759 0 4 9769 0 1 9791 6 16 9811 0 1 9823 0 64 9842 0 1 9866 0 8 9875 0 1 9882 0 1 9889 0 1 9896 0 1 9901 0 1 9907 0 16 9936 0 2 9949 0 2 9955 0 4 9975 3 16 9999 0 1 10017 0 1 10019 0 4 10040 0 2 10057 4 16 10103 2 16 10136 0 2 10143 0 2 10157 0 2 10162 0 8 10173 0 2 10181 0 2 10191 0 16 10218 0 1 10227 0 1 10234 0 64 10258 0 2 10266 0 2 10267 0 8 10273 0 2 10292 5 16 10312 0 1 10323 0 1 10332 0 1 10338 0 1 10345 0 1 10355 4 16 10399 0 64 10425 0 2 10442 1 16 10464 0 1 10474 0 1 10498 0 64 10521 0 1 10528 0 1 10531 0 4 10539 0 1 10560 2 16 10593 0 8 10600 0 1 10621 2 16 10640 0 1 10646 0 1 10649 0 8 10658 0 1 10662 0 1 10669 0 1 10675 0 1 10685 2 16 10715 0 2 10737 3 16 10764 0 4 10766 0 1 10787 0 1 10802 1 16 10830 0 2 10839 0 2 10842 0 8 10859 4 16 10881 0 2 10884 0 8 10894 0 4 10896 0 2 10904 0 2 10913 0 4 10931 0 2 10938 0 2 10944 6 16 10983 0 64 10997 0 1 11005 0 1 11010 0 8 11018 0 1 11026 0 1 11031 0 1 11036 0 1 11043 6 16 11068 0 1 11074 0 1 11081 0 1 11100 3 16 11136 0 1 11151 2 16 11180 0 64 11209 0 4 11216 0 2 11236 0 16 11259 0 2 11266 0 2 11273 0 8 11291 0 2 11297 0 4 11305 0 4 11326 4 16 11351 0 1 11360 0 64 11376 0 1 11383 0 1 11400 3 16 11419 0 1 11429 0 64 11444 0 1 11451 0 1 11454 0 4 11463 0 1 11469 0 1 11475 0 1 11482 0 1 11485 4 16 11512 0 2 11521 0 8 11528 0 2 11536 0 2 11541 0 2 11548 0 2 11560 5 16 11583 0 1 11595 0 2 11603 0 2 11620 3 16 11637 0 1 11668 4 16 11704 0 1 11714 0 1 11720 0 1 11731 0 2 11739 0 2 11747 0 2 11850 0 64 11876 0 2 11884 0 2 11892 0 4 11899 0 4 11917 6 16 11938 0 1 11946 0 1 11954 0 1 11970 1 16 11995 0 2 12002 0 2 12007 0 2 12013 0 2 12019 0 2 12023 0 16 12062 0 1 12076 0 16 12096 0 1 12103 0 1 12109 0 1 12115 0 1 12122 0 1 12128 0 1 12133 3 16 12203 0 1 12211 0 1 12217 0 1 12224 0 64 12253 0 8 12260 0 2 12272 0 2 12289 2 16 12345 0 4 12353 0 2 12363 0 2 12376 1 16 12402 0 1 12424 0 64 12444 0 1 12451 0 1 12459 0 1 12475 0 16 12500 0 4 12519 5 16 12541 0 1 12550 0 1 12551 0 8 12561 0 1 12569 0 1 12575 0 1 12583 0 1 12590 6 16 12662 0 64 12693 0 8 12700 0 2 12706 0 2 12712 0 2 12719 0 2 12725 0 2 12734 2 16 12763 0 4 12772 0 1 12789 5 16 12824 0 4 12831 0 4 12847 0 2 12854 0 2 12878 0 1 12891 0 16 12924 0 4 12931 0 4 12946 0 2 12953 0 2 12975 4 16 13072 0 4 13080 0 1 13090 0 1 13096 0 1 13341 1 16 13375 0 4 13390 0 1 13400 0 1 13419 0 2 13444 5 16 13557 0 4 13590 0 4 13611 0 4 13637 0 1 13647 0 1 13657 0 1 13664 0 1 13719 0 64 13734 0 1 13742 0 1 13749 0 1 13755 0 1 13761 0 1 13767 0 1 13775 0 1 13780 5 16 13834 0 8 13876 2 16 14014 0 2 14023 0 2 14049 0 64 14092 0 2 14095 0 8 14114 0 2 14244 2 16 14436 0 64 14450 0 2 14458 0 2 14465 0 2 14473 0 2 14479 0 2 14490 1 16 14545 0 1 14552 0 4 14560 0 1 14573 0 1 14579 0 4 14593 0 2 14608 4 16 14628 0 1 14637 0 1 14653 0 64 14678 0 1 14690 0 8 14697 0 1 14703 0 1 14708 0 1 14715 0 1 14721 0 1 14732 0 16 14761 0 4 14767 0 4 14787 4 16 14819 0 1 14829 0 1 14841 0 2 14847 0 2 14856 0 64 14874 0 1 14883 0 1 14888 0 1 14909 3 16 14925 0 2 14934 0 2 14942 0 2 14986 0 64 15000 0 2 15006 0 2 15013 0 2 15019 0 2 15024 0 2 15029 4 16 15069 0 2 15080 6 16 15110 0 8 15115 0 1 15127 0 1 15148 3 16 15168 0 1 15177 0 4 15183 0 1 15190 0 1 15201 0 1 15206 0 1 15211 0 1 15218 3 16 15246 0 1 15253 0 8 15262 0 1 15271 0 1 15288 6 16 15308 0 2 15328 3 16 15364 0 64 15380 0 2 15387 0 2 15391 0 2 15398 0 2 15404 0 16 15430 0 1 15438 0 4 15444 0 1 15450 0 1 15455 0 1 15461 0 1 15471 0 16 15498 0 4 15506 0 4 15524 4 16 15546 0 2 15561 0 8 15568 0 2 15575 0 2 15581 0 2 15587 0 16 15623 0 64 15646 0 2 15655 0 2 15662 0 4 15680 0 16 15693 0 1 15704 0 1 15711 0 4 15719 0 1 15739 0 2 15755 2 16 15799 0 1 15810 0 16 15836 0 2 15840 0 8 15846 0 2 15856 0 2 15861 0 2 15867 0 2 15877 0 16 15904 0 1 15910 0 4 15918 0 1 15931 0 1 15947 2 16 15982 0 64 16006 0 1 16010 0 4 16016 0 1 16022 0 1 16029 0 1 16036 0 1 16044 1 16 16081 0 64 16116 0 4 16124 0 4 16140 0 16 16175 0 8 16180 0 2 16188 0 2 16195 0 2 16217 2 16 16282 0 64 16308 0 8 16313 0 2 16323 0 2 16336 6 16 16357 0 1 16365 0 1 16384 0 2 16393 0 2 16420 0 64 16445 0 4 16452 0 4 16462 0 1 16470 0 1 16489 6 16 16514 0 2 16524 0 2 16545 0 64 16572 0 2 16593 3 16 16616 0 1 16625 0 4 16633 0 4 16649 0 1 16661 4 16 16686 0 2 16692 0 2 16695 0 4 16701 0 2 16711 0 2 16721 0 4 16724 0 2 16739 0 16 16761 0 1 16771 0 1 16791 0 2 16800 0 2 16876 0 64 16891 0 1 16902 0 4 16909 0 1 16921 0 1 16934 0 16 16989 0 64 17009 0 1 17017 0 1 17036 2 16 17082 0 16 17110 0 1 17115 0 4 17126 0 1 17133 0 1 17139 0 1 17145 0 1 17158 4 16 17187 0 2 17193 0 2 17199 0 2 17204 0 2 17216 4 16 17238 0 1 17240 0 4 17247 0 4 17264 0 4 17282 0 4 17289 0 4 17308 0 4 17317 0 1 17330 1 16 17355 0 2 17362 0 2 17394 3 16 17438 0 1 17453 0 1 17461 0 1 17468 0 64 17490 0 2 17504 0 2 17509 0 4 17515 0 2 17521 0 2 17527 0 2 17536 3 16 17559 0 1 17566 0 1 17573 0 1 17578 0 1 17584 0 1 17592 2 16 17622 0 2 17628 0 2 17648 2 16 17668 0 1 17696 0 64 17705 0 1 17730 0 1 17747 3 16 17777 0 4 17798 2 16 17818 0 2 17822 0 4 17828 0 2 17836 0 2 17843 0 2 17849 0 2 17854 2 16 17883 0 2 17899 4 16 17917 0 1 17924 0 1 17933 0 1 17955 0 2 17972 0 16 17994 0 1 18003 0 1 18018 0 1 18185 0 64 18213 0 1 18220 0 1 18225 0 1 18233 0 1 18621 4 0 18766 0 4 18768 0 8 18781 0 4 18794 0 4 18819 1 16 18847 0 1 18857 0 1 18865 0 1 18896 0 8 18907 0 1 18913 0 1 18922 0 1 18986 2 16 19097 0 4 19104 0 2 19112 0 2 19121 0 2 19199 0 64 19234 0 8 19241 0 2 19248 0 2 19254 0 2 19262 0 2 19268 0 2 19274 0 16 19305 0 1 19312 0 1 19323 0 8 19334 0 1 19346 0 1 19353 0 1 19467 1 16 19502 0 2 19513 0 1 19520 0 1 19531 0 1 19547 2 16 19565 0 2 19644 0 1 19654 0 1 19731 0 64 19755 0 2 19763 0 8 19772 0 2 19781 0 2 19796 0 1 19808 6 16 19840 0 64 19875 6 16 19914 0 1 19923 0 64 19944 0 2 19950 0 8 19957 0 2 19965 0 2 19971 0 2 19977 0 2 19985 1 16 20010 0 1 20017 0 1 20041 4 16 20068 0 4 20076 0 4 20094 3 16 20126 0 2 20130 0 4 20136 0 2 20159 0 4 20182 0 1 20197 0 16 20222 0 1 20239 0 1 20256 0 2 20273 6 16 20292 0 1 20302 0 4 20306 0 1 20313 0 8 20324 0 1 20330 0 1 20341 0 8 20349 0 1 20355 0 1 20367 3 16 20410 0 64 20439 0 2 20475 4 16 20500 0 2 20508 0 8 20514 0 2 20528 0 2 20545 3 16 20564 0 1 20577 0 8 20583 0 1 20598 0 1 20621 0 16 20654 0 2 20658 0 4 20667 0 2 20675 0 2 20682 0 2 20688 0 2 20696 5 16 20715 0 1 20726 0 8 20734 0 1 20742 0 1 20748 0 1 20754 0 1 20761 0 1 20769 6 16 20805 0 4 20809 0 1 20841 0 16 20870 0 8 20873 0 2 20881 0 2 20902 5 16 20928 0 1 20937 0 4 20944 0 1 20953 0 1 20973 5 16 21013 0 4 21021 0 2 21029 0 2 21041 0 1 21052 4 16 21136 0 64 21165 0 4 21170 0 2 21177 0 2 21183 0 2 21189 0 2 21196 0 2 21203 4 16 21234 0 64 21254 0 1 21260 0 4 21267 0 1 21274 0 1 21280 0 1 21285 0 1 21291 0 1 21296 6 16 21334 0 8 21342 0 1 21360 4 16 21385 0 1 21394 0 64 21413 0 1 21419 0 1 21438 0 1 21450 0 16 21480 0 1 21488 0 8 21500 0 2 21516 3 16 21563 0 64 21583 0 2 21594 0 8 21612 0 2 21628 2 16 21662 0 1 21671 0 1 21684 0 1 21691 0 1 21697 0 1 21703 0 1 21709 2 16 21730 0 1 21739 0 1 21747 0 2 21751 0 8 21758 0 2 21766 0 2 21772 0 2 21778 0 2 21785 0 2 21792 0 2 21799 6 16 21826 0 1 21837 0 64 21860 0 1 21875 3 16 21902 0 4 21909 0 4 21916 0 2 21923 0 2 21942 6 16 21958 0 1 21967 0 1 21969 0 4 21976 0 1 21995 2 16 22034 0 64 22072 5 16 22111 0 64 22131 0 1 22139 0 1 22144 0 8 22145 0 1 22151 0 1 22158 0 1 22166 0 1 22171 0 1 22175 5 16 22200 0 2 22208 0 2 22214 0 2 22219 0 2 22226 0 16 22244 0 1 22268 0 64 22293 0 1 22306 1 16 22327 0 1 22341 0 8 22350 0 1 22358 0 1 22381 6 16 22404 0 2 22411 0 2 22417 0 8 22421 0 2 22428 0 2 22437 4 16 22477 0 64 22503 0 4 22509 0 4 22514 0 2 22537 2 16 22562 0 1 22580 0 64 22600 0 1 22609 0 1 22616 0 4 22625 0 1 22646 3 16 22692 0 64 22717 0 1 22735 0 16 22785 0 64 22810 0 2 22833 6 16 22860 0 1 22868 0 1 22888 2 16 22913 0 64 22932 0 2 22952 6 16 22983 0 1 22992 0 1 22998 0 4 23004 0 1 23010 0 1 23018 0 1 23030 4 16 23058 0 64 23096 0 4 23102 0 2 23110 0 2 23117 0 2 23123 0 2 23131 0 2 23136 5 16 23156 0 1 23170 0 1 23212 0 64 23237 0 1 23250 0 4 23255 0 1 23262 0 1 23268 0 1 23285 0 2 23297 1 16 23326 0 2 23334 0 2 23340 0 4 23345 0 4 23360 1 16 23397 0 1 23407 0 64 23429 0 4 23435 0 4 23445 0 1 23463 0 16 23483 0 1 23493 0 8 23501 0 1 23509 0 1 23517 0 1 23524 0 1 23532 6 16 23556 0 1 23572 0 2 23585 5 16 23625 0 1 23662 0 64 23683 0 1 23693 0 1 23695 0 8 23701 0 1 23708 0 1 23734 0 16 23768 0 8 23773 0 2 23782 0 2 23788 0 2 23795 0 2 23801 0 2 23808 0 2 23815 6 16 23843 0 1 23863 0 8 23872 0 1 23894 5 16 23918 0 2 23926 0 4 23935 0 4 23944 0 2 23956 0 4 23975 0 4 23982 0 4 23993 0 1 24010 0 2 24022 2 16 24051 0 2 24064 0 64 24083 0 2 24091 0 2 24098 0 2 24105 0 2 24112 0 2 24120 0 2 24128 2 16 24187 0 64 24219 0 8 24227 0 2 24238 0 2 24255 0 1 24272 2 16 24304 0 4 24311 0 4 24319 0 2 24328 0 2 24334 0 2 24340 0 2 24347 4 16 24370 0 1 24379 0 64 24407 0 4 24423 0 4 24433 0 1 24451 0 16 24473 0 1 24482 0 1 24490 0 1 24495 0 4 24501 0 5 24512 0 1 24524 2 16 24555 0 8 24562 0 1 24570 0 1 24576 0 1 24582 0 1 24587 0 1 24593 0 1 24601 5 16 24646 0 64 24668 0 2 24674 0 2 24681 0 2 24688 0 2 24694 0 16 24715 0 1 24741 0 2 24774 0 1 24791 1 16 24819 0 2 24853 0 16 24872 0 1 24880 0 1 24904 3 16 24931 0 64 24952 0 1 24966 0 1 24974 0 8 24979 0 1 24983 0 1 24991 0 1 25008 0 2 25019 4 16 25049 0 64 25064 0 2 25072 0 2 25077 0 8 25084 0 2 25092 0 2 25100 5 16 25129 0 64 25147 0 2 25154 0 2 25171 0 2 25182 0 16 25210 0 4 25230 0 16 25251 0 1 25260 0 8 25269 0 1 25275 0 1 25282 0 1 25289 0 1 25293 0 1 25300 0 1 25303 1 16 25326 0 1 25332 0 4 25339 0 1 25360 6 16 25388 0 8 25393 0 2 25413 3 16 25441 0 1 25449 0 1 25474 3 16 25506 0 2 25513 0 2 25520 0 2 25541 3 16 25568 0 1 25579 0 1 25590 0 8 25598 0 1 25606 0 1 25612 0 1 25619 0 1 25627 1 16 25742 0 64 25778 0 8 25809 1 16 25858 0 4 25863 0 2 25869 0 2 25875 0 2 25881 0 2 25887 0 2 25892 0 2 25902 1 16 25925 0 4 25931 0 2 25942 0 2 25960 4 16 25995 0 1 26009 0 1 26025 0 2 26038 5 16 26059 0 1 26080 0 1 26095 0 64 26112 0 1 26118 0 4 26124 0 1 26133 0 1 26150 1 16 26177 0 2 26184 0 2 26191 0 2 26211 4 16 26239 0 1 26245 0 1 26252 0 1 26277 6 16 26301 0 1 26339 0 64 26380 3 16 26413 0 64 26436 0 2 26442 0 4 26448 0 4 26466 0 2 26480 5 16 26509 0 9 26518 0 1 26541 1 16 26562 0 1 26573 0 8 26578 0 1 26584 0 1 26589 0 1 26594 0 1 26600 0 1 26608 1 16 26635 0 1 26639 0 4 26648 0 1 26656 0 1 26677 0 16 26707 0 4 26735 0 2 26741 0 2 26746 0 2 26753 0 2 26758 0 2 26779 0 1 26781 0 4 26894 0 2 26905 0 2 26938 4 16 26964 0 2 26972 0 2 26978 0 2 26983 0 2 26989 0 2 26995 0 2 27002 4 16 27029 0 4 27039 0 2 27058 2 16 27077 0 1 27087 0 1 27088 0 4 27094 0 1 27105 0 1 27112 0 1 27126 4 16 27146 0 1 27154 0 8 27160 0 1 27169 0 1 27184 0 2 27199 6 16 27220 0 1 27229 0 8 27237 0 1 27251 0 1 27259 0 1 27277 0 2 27297 3 16 27348 0 64 27369 0 2 27378 0 2 27398 1 16 27420 0 1 27426 0 8 27428 0 1 27435 0 1 27442 0 1 27462 6 16 27514 0 64 27536 0 2 27544 0 4 27549 0 2 27555 0 2 27562 0 2 27568 0 2 27577 6 16 27616 6 16 27644 0 2 27650 0 2 27657 0 2 27671 0 16 27691 0 1 27702 0 4 27720 0 1 27726 0 4 27734 0 5 27744 0 1 27751 0 1 27757 0 1 27762 0 1 27768 5 16 27797 0 8 27814 0 4 27825 0 4 27837 0 1 27852 0 16 27872 0 1 27879 0 4 27894 0 1 27910 2 16 27956 0 64 27985 0 4 27991 0 2 28011 1 16 28049 0 64 28068 0 2 28077 0 2 28081 0 8 28087 0 2 28095 0 2 28104 0 2 28120 5 16 28142 0 1 28152 0 4 28160 0 1 28171 0 1 28202 0 64 28231 0 2 28239 0 8 28246 0 2 28264 4 16 28279 0 1 28289 0 1 28296 0 4 28303 0 4 28311 0 1 28318 0 1 28327 0 1 28334 0 1 28337 3 16 28375 0 1 28382 0 1 28391 0 1 28397 0 64 28413 0 1 28422 0 8 28429 0 2 28451 0 16 28466 0 1 28474 0 1 28480 0 1 28486 0 1 28490 0 1 28496 0 1 28503 0 16 28519 0 1 28526 0 1 28536 0 1 28545 0 1 28550 0 64 28569 0 1 28575 0 1 28580 0 1 28586 0 1 28591 0 1 28598 5 16 28617 0 1 28624 0 4 28628 0 1 28645 0 2 28655 5 16 28677 0 1 28682 0 2 28690 0 8 28698 0 2 28704 0 2 28711 0 2 28717 0 2 28727 0 1 28794 2 0 28830 0 64 28868 0 2 28875 0 8 28970 6 0 29019 0 64 29037 0 2 29047 0 2 29052 0 8 29057 0 2 29070 0 2 29162 4 0 29187 0 4 29195 0 4 29310 1 0 29331 0 1 29339 0 1 29342 0 4 29349 0 1 29362 0 1 29370 0 4 29380 0 2 29459 4 0 29504 0 1 29511 0 1 29518 0 64 29539 0 1 29545 0 4 29553 0 4 29564 0 1 29571 0 1 29577 0 1 29585 0 1 29699 0 1 29712 0 64 29735 0 2 29760 0 2 29863 3 0 30015 6 0 30045 0 2 30054 0 2 30163 4 0 30217 0 4 30221 0 1 30228 0 4 30248 0 4 30264 0 1 30347 3 0 30375 0 2 30381 0 4 30382 0 2 30391 0 2 30397 0 2 30495 5 0 30520 0 1 30525 0 1 30530 0 1 30536 0 1 30542 0 1 30647 5 0 30674 0 1 30680 0 1 30686 0 1 30691 0 1 30698 0 1 30799 5 0 30832 0 1 30848 0 2 30985 0 4 31014 0 4 31140 0 64 31162 0 2 31171 0 8 31180 0 2 31287 1 0 31319 0 1 31331 0 8 31339 0 1 31346 0 1 31350 0 1 31356 0 1 31361 0 1 31431 2 0 31451 0 2 31456 0 8 31459 0 2 31464 0 2 31469 0 2 31475 0 2 31652 0 64 31677 0 4 31683 0 1 31691 0 1 31700 0 1 31799 1 0 31846 0 2 31854 0 2 31864 0 2 31870 0 64 31899 0 4 31902 0 1 31917 0 1 31979 2 0 32015 0 2 32093 5 0 32123 0 8 32138 0 1 32149 0 1 32215 1 0 32238 0 1 32244 0 1 32252 0 1 32331 3 0 32359 0 1 32366 0 1 32374 0 2 32380 0 64 32396 0 2 32403 0 2 32417 0 2 32494 5 0 32520 0 1 32530 0 1 32537 0 64 32558 0 8 32648 3 0 32691 0 1 32696 0 2 32702 0 2 32704 0 1 32708 0 2 32712 0 1 32713 0 2 32717 0 1 32724 0 1 32734 0 2 32741 0 2 32746 0 2 32752 0 64 32774 0 1 32781 0 1 32782 0 4 32791 0 4 32792 0 1 32796 0 1 32800 0 1 32806 0 1 32873 6 0 32897 0 2 32902 0 4 32905 0 2 32912 0 2 32918 0 2 32926 0 2 32995 4 0 33025 0 1 33032 0 1 33038 0 1 33044 0 1 33050 0 1 33053 0 2 33061 0 2 33064 0 1 33070 0 2 33074 0 1 33076 0 2 33081 0 1 33083 0 2 33086 0 1 33089 0 2 33092 0 1 33093 0 2 33098 0 1 33101 0 2 33104 0 64 33130 0 2 33139 0 2 33217 6 0 33249 0 1 33256 0 1 33263 0 1 33269 0 1 33275 0 64 33297 0 1 33300 0 4 33307 0 4 33311 0 1 33386 3 0 33413 0 1 33418 0 1 33426 0 1 33431 0 1 33436 0 1 33508 3 0 33537 0 1 33543 0 1 33544 0 64 33568 0 4 33573 0 2 33580 0 2 33587 0 2 33592 0 2 33599 0 2 33669 6 0 33718 0 2 33793 3 0 33825 0 64 33847 0 1 33855 0 1 33861 0 1 33866 0 1 33941 5 0 33964 0 1 33971 0 1 33974 0 4 33985 0 1 34053 3 0 34096 0 8 34097 0 1 34110 0 1 34176 6 0 34206 0 1 34213 0 2 34222 0 2 34231 0 2 34310 5 0 34335 0 2 34341 0 2 34348 0 4 34349 0 2 34356 0 2 34364 0 2 34435 5 0 34459 0 1 34466 0 1 34473 0 1 34479 0 1 34483 0 1 34551 0 1 34556 4 0 34592 0 4 34598 0 4 34608 0 2 34674 1 0 34697 0 1 34700 0 4 34707 0 1 34711 0 1 34786 1 0 34815 0 2 34822 0 4 34828 0 2 34832 0 4 34838 0 2 34844 0 2 34846 0 4 34852 0 2 34853 0 4 34858 0 4 34859 0 2 34865 0 4 34874 0 1 34916 0 4 34924 0 1 34934 0 1 34939 0 4 34952 0 1 34958 0 1 34961 0 12 34968 0 1 34976 0 1 34983 0 4 34989 0 1 34994 0 4 34997 0 1 35066 1 0 35088 0 2 35100 0 2 35162 2 0 35180 0 2 35188 0 2 35194 0 2 35201 0 2 35206 0 2 35278 4 0 35300 0 2 35307 0 2 35315 0 2 35321 0 64 35341 0 1 35347 0 1 35355 0 1 35423 4 0 35437 0 1 35453 0 1 35460 0 2 35466 0 1 35471 0 64 35489 0 1 35499 0 4 35506 0 4 35512 0 1 35514 0 4 35522 0 1 35527 0 4 35534 0 1 35538 0 1 35544 0 1 35549 0 12 35558 0 1 35561 0 4 35568 0 5 35576 0 4 35582 0 1 35587 0 4 35599 0 1 35606 0 1 35610 0 4 35619 0 1 35630 0 1 35695 3 0 35715 0 1 35723 0 2 35728 0 4 35734 0 4 35743 0 2 35819 2 0 35841 0 2 35847 0 1 35853 0 2 35861 0 2 35867 0 1 35873 0 2 35877 0 1 35880 0 2 35888 0 1 35893 0 2 35900 0 2 35906 0 2 35976 3 0 36001 0 1 36007 0 1 36011 0 64 36022 0 1 36029 0 1 36035 0 1 36041 0 1 36111 4 0 36146 0 2 36221 3 0 36235 0 2 36245 0 2 36254 0 1 36260 0 2 36263 0 1 36266 0 64 36289 0 1 36298 0 1 36312 0 1 36374 4 0 36391 0 2 36397 0 2 36408 0 2 36410 0 1 36416 0 2 36419 0 1 36423 0 2 36427 0 64 36445 0 2 36450 0 2 36456 0 2 36461 0 4 36469 0 2 36475 0 2 36545 5 0 36562 0 2 36571 0 1 36578 0 1 36588 0 1 36648 0 1 36654 4 0 36670 0 1 36675 0 1 36681 0 4 36689 0 1 36692 0 4 36699 0 1 36707 0 1 36713 0 13 36719 0 1 36729 0 4 36737 0 1 36740 0 4 36745 0 1 36750 0 1 36754 0 1 36759 0 4 36767 0 4 36769 0 1 36776 0 1 36834 3 0 36853 0 1 36859 0 1 36867 0 1 36873 0 2 36879 0 1 36886 0 2 36889 0 1 36893 0 2 36902 0 2 36908 0 64 36931 0 2 36938 0 2 36945 0 2 36951 0 2 37020 4 0 37040 0 1 37047 0 1 37054 0 64 37148 5 0 37173 0 1 37184 0 1 37188 0 1 37193 0 8 37199 0 1 37202 0 1 37268 2 0 37292 0 2 37298 0 2 37306 0 2 37374 6 0 37392 0 1 37397 0 1 37404 0 1 37410 0 1 37413 0 64 37418 0 1 37436 0 1 37444 0 1 37455 0 2 37462 0 2 37467 0 1 37474 0 2 37481 0 2 37489 0 2 37557 6 0 37574 0 1 37586 0 1 37593 0 64 37600 0 1 37608 0 1 37615 0 1 37619 0 8 37626 0 1 37635 0 1 37702 5 0 37722 0 1 37732 0 1 37737 0 1 37745 0 1 37798 1 0 37816 0 1 37823 0 2 37829 0 2 37834 0 4 37842 0 2 37847 0 4 37849 0 2 37857 0 2 37865 0 2 37925 2 0 37943 0 1 37951 0 1 37960 0 1 37966 0 8 37974 0 1 37979 0 1 37985 0 1 37993 0 1 38055 4 0 38079 0 2 38085 0 2 38091 0 2 38097 0 2 38166 3 0 38189 0 1 38195 0 2 38204 0 2 38212 0 2 38280 5 0 38287 0 2 38293 0 2 38301 0 1 38312 0 1 38316 0 64 38332 0 1 38341 0 1 38347 0 8 38353 0 1 38362 0 1 38430 0 1 38437 0 1 38444 0 1 38457 0 2 38464 0 1 38471 0 2 38477 0 64 38494 0 1 38501 0 1 38509 0 1 38517 0 2 38524 0 2 38530 0 2 38539 0 2 38543 0 8 38548 0 2 38554 0 2 38631 0 1 38636 0 1 38641 0 1 38645 0 4 38655 0 1 38664 0 2 38666 0 4 38741 5 0 38758 0 1 38765 0 1 38773 0 1 38783 0 4 38794 0 5 38795 0 1 38796 0 1 38797 0 1 38798 0 1 38799 0 1 38800 0 1 38801 0 1 38803 0 1 38813 0 4 38817 0 1 38819 0 4 38824 0 1 38826 0 4 38832 0 4 38839 0 4 38845 0 1 38847 0 4 38855 0 1 38857 0 4 38894 0 4 38900 0 2 38907 0 2 38916 0 2 38925 0 2 39014 0 1 39024 0 1 39030 0 2 39033 0 64 39051 0 1 39063 0 1 39067 0 8 39072 0 1 39078 0 1 39142 5 0 39159 0 2 39162 0 1 39172 0 1 39180 0 64 39197 0 2 39205 0 8 39216 0 2 39218 0 8 39281 5 0 39298 0 2 39306 0 2 39311 0 1 39318 0 1 39324 0 1 39334 0 1 39338 0 1 39346 0 1 39352 0 1 39414 3 0 39436 0 2 39443 0 2 39448 0 1 39455 0 2 39463 0 1 39469 0 64 39481 0 1 39492 0 4 39504 0 2 39581 4 0 39600 0 2 39605 0 1 39613 0 1 39619 0 1 39626 0 1 39628 0 64 39636 0 2 39644 0 2 39649 0 8 39654 0 2 39660 0 2 39668 0 2").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 565 0 70 0 2 91 0 2 92 0 2 93 0 2 94 0 2 95 0 2 96 0 2 97 0 2 98 0 2 99 0 2 10").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 3402 0 106 0 2 142 0 2 169 0 2 237 4 80 424 0 1 506 0 1 574 0 1 595 0 1 596 0").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 2672 0 45 0 4 66 0 4 112 0 4 165 0 8 224 0 4 279 0 4 302 0 4 421 0 32 576 1 80").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 240 0 0 0 2 21 3 17 42 0 1 43 0 1 44 0 1 45 0 1 46 0 1 47 0 1 48 0 1 51 0 1 56").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 2756 0 212 0 2 219 0 2 225 0 2 230 0 2 235 2 16 253 0 1 268 0 4 278 0 2 286 0 2 291 0 2 297 0 2 303 0 2 310 0 2 317 0 2 329 2 16 347 0 1 355 0 1 363 0 1 368 0 8 387 0 4 419 0 2 425 0 2 440 0 2 449 0 1 470 0 4 481 0 1 487 0 1 491 0 4 498 0 1 505 0 1 510 0 16 526 0 8 542 0 4 559 0 4 575 0 4 593 0 4 608 0 1 615 0 4 639 0 16 668 0 2 678 0 4 713 0 1 725 0 1 735 0 1 743 0 1 750 0 4 759 0 4 770 0 1 774 0 1 782 0 1 788 0 16 813 0 8 823 0 8 836 0 4 849 0 4 865 0 1 915 0 4 921 0 1 931 0 1 953 2 16 1071 0 4 1080 0 2 1093 0 2 1107 4 16 1131 0 2 1139 0 4 1153 0 2 1166 0 2 1185 0 2 1194 6 16 1216 0 4 1222 0 2 1230 0 2 1246 2 16 1282 0 1 1298 0 4 1325 0 4 1336 0 4 1360 1 16 1537 0 4 1546 0 2 1554 0 2 1560 0 2 1567 0 1 1575 0 1 1582 0 1 1588 0 4 1604 0 1 1613 0 1 1620 0 1 1627 0 1 1636 0 4 1659 6 16 1811 0 4 1829 0 4 1875 0 1 1902 0 4 1928 0 1 1950 0 1 1958 0 1 1964 0 1 1974 0 1 1981 1 16 2039 0 4 2101 5 16 2140 0 2 2149 0 2 2173 0 1 2194 0 1 2208 0 1 2215 0 1 2220 0 1 2227 0 1 2233 0 1 2263 1 16 2327 0 2 2336 0 2 2345 0 4 2361 0 4 2379 0 4 2405 0 2 2421 0 1 2429 0 1 2436 0 1 2443 0 1 2459 0 1 2478 4 16 2644 1 16 2680 0 2 2686 0 2 2707 0 1 2715 0 1 2722 0 1 2739 0 4 2754 0 1 2768 4 16 2787 0 2 2794 0 2 2801 0 2 2811 0 1 2833 0 1 2846 1 16 2868 0 2 2876 0 2 2883 0 2 2893 0 4 2924 0 2 2936 0 1 2945 0 1 2952 0 1 2961 0 1 2971 0 4 2980 0 1 2990 0 1 2998 0 1 3006 0 4 3015 0 1 3024 0 1 3032 5 16 3074 0 2 3087 3 16 3102 0 2 3112 0 2 3123 0 1 3134 0 1 3143 0 1 3150 0 1 3167 0 1 3170 0 4 3174 0 1 3182 0 1 3188 5 16 3211 0 1 3236 3 16 3244 0 1 3265 0 4 3281 0 1 3300 0 2 3307 0 2 3314 0 2 3321 0 2 3328 0 2 3335 0 2 3343 4 16 3365 0 2 3372 0 2 3379 0 1 3389 0 1 3398 0 1 3409 5 16 3466 0 1 3476 0 2 3484 0 2 3491 0 2 3497 0 4 3507 0 2 3513 0 4 3523 0 2 3528 0 4 3549 6 16 3600 0 1 3613 0 2 3616 0 4 3625 0 2 3650 0 64 3680 0 1 3752 0 4 3801 0 1 3817 0 2 3826 5 16 3870 0 2 3879 0 4 3894 0 2 3902 0 2 3909 0 2 3918 1 16 3960 0 64 4002 0 64 4021 0 1 4035 0 8 4055 0 2 4058 0 64 4070 0 64 4078 0 64 4085 0 64 4089 0 1 4091 0 64 4101 0 1 4102 0 64 4109 0 1 4116 0 1 4124 0 1 4131 0 1 4138 0 4 4147 0 1 4161 0 4 4171 0 1 4188 1 16 4205 0 2 4215 0 4 4222 0 2 4229 0 2 4236 0 2 4249 0 1 4263 0 16 4352 0 2 4358 0 2 4364 0 4 4372 0 2 4379 0 2 4382 0 4 4390 0 2 4397 0 2 4399 0 4 4412 0 2 4423 4 16 4463 0 2 4498 0 1 4540 0 2 4548 0 2 4561 0 64 4595 0 4 4627 0 1 4650 0 2 4659 0 4 4688 0 4 4711 0 2 4723 0 1 4732 0 1 4739 0 1 4745 0 1 4753 0 1 4760 0 1 4767 0 1 4773 0 16 4811 0 2 4844 3 16 4863 0 4 4870 0 2 4877 0 2 4883 0 2 4899 2 16 4976 0 2 4991 0 1 5007 0 1 5015 0 1 5022 0 1 5029 0 1 5036 0 1 5046 0 1 5126 0 4 5142 0 1 5410 0 1 5428 4 16 5473 0 2 5479 0 2 5532 0 2 5543 0 4 5554 0 2 5560 0 2 5569 2 16 5609 0 2 5619 0 4 5654 0 1 5665 0 4 5675 0 1 5754 0 4 5778 0 1 5848 0 1 5859 0 1 5878 5 16 5903 0 4 5909 0 2 5916 0 2 5922 0 2 5935 3 16 5980 0 4 6003 0 2 6014 0 1 6043 0 4 6072 0 1 6132 0 8 6139 0 1 6146 0 8 6154 0 2 6417 0 1 6471 2 16 6498 0 2 6518 0 4 6547 0 2 6560 5 16 6585 0 4 6595 0 2 6604 0 2 6624 0 2 6635 0 2 6642 0 2 6653 0 1 6662 0 1 6670 0 1 6696 0 1 6717 0 4 6735 0 4 6774 0 4 6792 0 1 6807 0 8 6822 0 4 6941 0 1 7085 0 1 7101 5 16 7123 0 2 7131 0 2 7138 0 2 7174 0 4 7190 0 2 7196 0 2 7203 1 16 7230 0 4 7257 0 4 7285 4 16 7350 0 2 7363 0 16 7387 0 4 7428 0 4 7454 4 16 7477 0 2 7485 0 2 7493 0 2 7509 5 16 7577 0 4 7595 0 4 7635 6 16 7659 0 4 7665 0 2 7677 0 2 7683 0 2 7689 0 2 7695 0 2 7701 0 2 7708 6 16 7813 0 4 7822 0 2 7829 0 2 7841 0 16 7869 0 2 7878 0 2 7884 0 1 7892 0 1 7898 0 4 7903 0 1 7912 0 1 7926 2 16 7961 0 2 7976 0 4 7985 0 1 8000 0 16 8011 0 2 8018 0 2 8024 0 2 8035 0 4 8046 0 2 8053 0 2 8059 2 16 8072 0 1 8081 0 1 8087 0 1 8095 0 1 8103 5 16 8120 0 1 8128 0 1 8135 0 1 8143 0 1 8154 1 16 8177 0 1 8185 0 4 8202 1 16 8203 0 2 8223 1 16 8231 0 2 8239 0 2 8243 3 16 8257 3 16").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 136 0 192 0 2 198 0 4 208 0 2 213 0 2 219 0 2 225 0 2 321 0 4 332 3 16 362 0 1 370 0 1 389 0 1 398 0 1 417 3 16 443 0 1 489 0 1 510 5 16 589 0 4 604 0 2 622 0 2 629 0 4 635 0 2 644 0 2 652 1 16 688 0 4 715 1 16 749 0 1 758 0 4 766 0 1 775 0 1 791 2 16 817 0 2 824 0 2 832 0 2 865 5 16 889 0 2 907 0 2 921 0 16 1031 0 2 1041 0 2 1055 1 16 1087 0 1 1098 0 4 1108 0 1 1120 0 4 1170 6 16 1215 0 4 1229 0 1 1238 0 1 1244 0 4 1256 0 4 1289 0 4 1344 5 16 1376 0 4 1383 0 1 1390 0 1 1397 0 1 1408 0 2 1415 0 2 1421 0 2 1427 0 2 1446 0 16 1478 0 2 1495 0 2 1515 0 16 1555 0 1 1562 0 4 1577 0 4 1611 0 4 1627 0 4 1661 0 4 1677 0 4 1693 0 4 1721 0 1 1729 0 1 1735 0 1 1743 0 1 1749 0 1 1756 4 16 1786 0 1 1808 0 1 1863 0 1 1889 3 16 1917 0 4 1929 0 2 1936 0 2 1943 0 2 1949 0 2 1956 0 2 1974 0 1 1981 0 1 1989 0 1 1996 0 1 2004 0 1 2011 0 1 2018 0 1 2025 0 1 2033 0 1 2040 0 1 2106 6 16 2138 0 4 2151 0 2 2158 0 2 2164 0 2 2170 0 2 2193 0 1 2201 0 1 2208 0 1 2216 0 1 2223 0 1 2231 0 1 2239 0 1 2247 0 1 2254 0 1 2260 1 16 2278 0 2 2287 0 2 2292 0 4 2311 0 1 2330 0 4 2343 0 1 2357 0 1 2370 5 16 2450 0 4 2475 1 16 2500 0 2 2535 0 2 2542 0 1 2561 5 16 2587 0 2 2606 0 2 2635 6 16 2663 0 1 2674 0 4 2691 0 1 2701 0 4 2737 0 4 2752 0 1 2760 0 1 2776 2 16 2802 0 1 2826 0 2 2833 0 2 2839 0 2 2848 0 16 2880 0 4 2911 0 1 2924 0 1 2932 0 4 2944 0 4 2962 0 4 2987 0 4 3011 0 4 3037 0 4 3057 0 2 3063 0 2 3069 0 2 3083 0 1 3090 0 2 3103 0 1 3110 0 2 3119 0 1 3128 0 2 3145 1 16 3163 0 1 3174 0 4 3189 0 1 3200 0 4 3246 0 4 3273 0 1 3325 0 4 3346 0 4 3363 0 4 3380 0 4 3406 5 16 3446 0 1 3466 0 4 3488 0 4 3506 0 4 3512 0 2 3518 0 2 3531 0 2 3538 0 2 3558 2 16 3583 0 2 3590 0 2 3596 0 2 3604 0 4 3611 0 2 3617 0 2 3624 0 2 3636 0 1 3646 0 1 3652 0 2 3660 0 2 3670 1 16 3728 0 1 3790 0 16 3821 0 1 3843 0 4 3907 0 2 3940 2 16 3964 0 1 3974 0 1 3989 0 4 4000 0 1 4011 0 4 4029 0 4 4045 0 1 4059 3 16 4090 0 1 4140 0 2 4157 3 16 4175 0 2 4182 0 2 4188 0 4 4194 0 2 4202 0 2 4215 3 16 4244 0 2 4256 0 2 4262 0 4 4273 0 2 4280 0 2 4287 0 2 4298 2 16 4335 0 1 4347 0 1 4358 0 4 4368 0 1 4376 0 1 4396 0 2 4414 1 16 4457 0 1 4474 0 4 4494 0 1 4513 1 16 4549 0 4 4571 0 1 4583 0 1 4592 0 2 4619 0 1 4632 0 16 4658 0 4 4677 0 2 4684 0 2 4690 0 4 4695 0 2 4702 0 2 4708 0 4 4715 0 2 4727 5 16 4796 1 16 4823 0 1 4839 0 1 4852 0 2 4860 0 2 4873 4 16 4898 0 4 4913 0 2 4920 0 2 4927 0 2 4934 0 1 4942 0 1 4949 0 1 4956 0 1 4963 0 1 4974 0 2 4981 0 2 4988 0 2 4995 0 2 5003 0 2 5012 0 1 5031 0 1 5052 0 2 5059 0 2 5066 0 2 5073 0 2 5080 0 2 5096 2 16 5148 0 4 5158 0 1 5168 0 1 5177 0 4 5192 0 4 5233 0 2 5239 0 2 5246 0 2 5261 0 2 5289 0 1 5298 0 1 5315 0 1 5329 0 1 5344 0 1 5352 0 1 5360 0 1 5378 4 16 5405 0 2 5420 0 1 5433 4 16 5456 0 2 5476 0 2 5485 0 1 5492 0 4 5497 0 1 5506 0 1 5513 0 1 5520 0 1 5544 0 2 5551 0 2 5558 0 2 5564 0 2 5571 0 2 5578 0 2 5594 0 16 5623 0 1 5633 0 1 5643 0 4 5653 0 1 5684 0 2 5697 3 16 5723 0 4 5730 0 2 5737 0 2 5744 0 2 5770 4 16 5793 0 4 5808 0 2 5816 0 2 5841 0 1 5850 0 1 5857 0 1 5864 0 1 5884 6 16 5908 0 4 5913 0 2 5920 0 2 5927 0 2 5933 0 2 5939 0 2 5950 4 16 5987 0 1 5995 0 1 6003 0 1 6015 0 4 6027 0 2 6033 0 2 6041 0 2 6048 0 2 6059 0 4 6067 0 2 6092 5 16 6152 0 1 6161 0 4 6175 0 2 6182 0 2 6190 0 2 6201 5 16 6222 0 1 6228 0 4 6237 0 1 6245 0 1 6259 0 1 6275 2 16 6293 0 1 6302 0 1 6311 0 4 6318 0 1 6335 0 2 6343 5 16 6387 1 16 6412 0 2 6419 0 2 6424 0 2 6433 0 4 6444 0 2 6450 0 4 6457 0 2 6465 0 2 6467 0 4 6476 0 2 6485 1 16 6501 0 1 6509 0 1 6518 0 4 6533 0 1 6543 0 4 6590 0 1 6596 0 4 6617 0 1 6626 0 1 6634 5 16 6658 0 1 6695 0 1 6709 0 2 6726 3 16 6787 0 1 6807 4 16 6826 0 2 6833 0 2 6841 0 2 6871 0 1 6880 0 1 6887 0 1 6895 0 1 6902 0 1 6910 0 1 6924 0 2 6931 0 2 6938 0 2 6945 0 2 6952 0 2 6978 0 16 7007 0 2 7023 0 4 7033 0 2 7039 0 2 7046 0 2 7053 3 16 7087 0 2 7094 0 2 7104 0 2 7116 0 4 7125 0 1 7132 0 1 7138 0 1 7147 6 16 7161 0 1 7169 0 1 7176 0 1 7184 0 1 7194 0 2 7201 0 2 7207 0 2 7214 0 2 7223 0 2 7236 3 64 7254 0 1 7276 0 1 7289 0 4 7295 0 1 7320 0 1 7328 6 16 7348 0 1 7361 0 2 7368 0 2 7375 0 2 7382 0 2 7409 0 4 7425 0 2 7456 0 1 7466 0 1 7472 0 1 7487 6 16 7525 0 1 7538 0 4 7544 0 1 7554 0 1 7569 4 16 7595 0 2 7602 0 2 7609 0 2 7631 0 4 7650 1 16 7666 0 1 7674 0 1 7682 0 4 7697 0 1 7718 5 16 7743 0 4 7756 0 1 7765 0 4 7779 0 1 7788 0 4 7806 4 16 7823 0 2 7830 0 2 7837 0 2 7855 6 16 7874 0 1 7882 0 1 7889 0 1 7897 0 1 7905 0 1 7911 1 16 7935 0 4 7950 0 2 7962 4 16 7976 0 2 7983 0 2 7990 0 2 7995 0 4 8005 0 2 8023 1 16 8044 0 1 8052 0 1 8060 0 1 8069 0 2 8191 0 2 8197 0 2 8204 0 2 8210 0 2 8216 0 2 8223 0 2 8229 0 2 8236 0 2 8243 0 2 8311 4 0 8327 0 1 8337 0 1 8344 0 1 8362 4 16 8379 0 1 8386 0 1 8393 0 1 8404 0 4 8410 0 1 8418 0 1 8425 2 16 8441 0 2 8447 0 2 8454 0 2 8479 6 16 8494 0 1 8503 0 1 8518 0 1 8527 0 1 8534 0 1 8568 0 2 8584 0 1 8594 5 16 8607 0 2 8614 0 2 8628 0 2 8635 0 16 8651 0 1 8667 3 16 8687 1 16").build()));
		
		
		
		};
	}
	
}
