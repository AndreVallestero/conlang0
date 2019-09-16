# conlang0
A conlang focused on human ergonomics, efficiency, and learnability.
   
## Phonology
Phonemes are sorted based on ease of communicability and global usage frequency.

Consonants  

|           |labial|alveolar|palatal/velar|  
|-----------|------|--------|-------------|
|nasal      |m     |n       |             |
|stop       |p     |t       |k            |
|approximant|w     |l       |j            |

- 0 = m
- 1 = n
- 2 = p
- 3 = t
- 4 = k
- 5 = w
- 6 = l
- 7 = j

Vowels 

|          |front|center|back|  
|----------|-----|------|----|
|close     |i    |      |u   |
|near close|ɪ    |      |    |
|mid       |     |ə     |    |
|open mid  |e    |      |ɔ   |
|open      |æ    |      |ɑ   |

- 0 = ə
- 1 = e
- 2 = ɪ
- 3 = ɔ
- 4 = u
- 5 = æ
- 6 = i
- 7 = ɑ

Adjacent vowels should be treated as separate syllables rather than diphthongs.

## Orthography  
  
## Grammar
Head initial
Particles never have an end consonant
Verbs always have an end consonant

C-V-C = Standard syllable syntax (512) *vasli*

- [0,7]-[0,7]-0 = Particles (64) *cmavo*
	- [0,7]-0-0 = Numbers
- Verbs (448) *brivla*
	- [1,7]-0-[1,7] = Suffix (49) *rafsi*
	- 0-[0,7]-[1,7] = Operators, flow control, and logic (56)
	- [1,7]-[1,7]-[1,7] = Normal verbs (343) *gimsu*


## Vocabulary   
[Click here for lexicon](lexicon.md) 

Quantitative suffixes [1]-1-[1-7]

- 1	zero		"I'm not happy at all"
- 2	almost zero	"I'm almost not happy"
- 3	below usual	"I'm less happy than usual"
- 4	usual		"I'm as happy as usual"
- 5	above usual	"I'm more happy than usual"
- 6	almost max	"I'm almost maximally happy"
- 7	maximum		"I'm as happy as I can be"

## Math
16777216	(big endian base 10)
100000000	(big endian base 8)  

011 101 100		(conlang0 big-endian HAN a.k.a hindu-arbic notation)  
  
translation  
011 = x1 ** 8 * x2  
101 = 8  
100 = 1  
  
:: 011 101 100 = 8 ** 8 * 1 = 16777216

