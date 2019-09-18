THIS PROJECT IS UNDER HEAVY DEVELOPMENT. EXPECT MAJOR OVERHAULS FREQUENTLY  
    
# conlang0  
A conlang focused on human ergonomics, efficiency, and learnability.

particles as functions. Changes structure and can literally modify parameters.  
  
There are 2 type of particles. Morphing particles and tagging particles.  
  
Morphing particles will literally internally modify whatever parameters are passed to it.  
   
Tagging particles will externally change how a parameter is read by outside verbs or particles.
   
## Phonology
Phonemes are sorted based on ease of communicability and global usage frequency.

Consonants  

|           |labial|alveolar|palatal/velar|  
|-----------|------|--------|-------------|
|nasal      |      |n       |             |
|stop       |p     |t       |k            |
|approximant|w     |l       |j            |

- 0 =
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
Can be written entirely without spaces

Head initial

Particles never have an end consonant

Verbs always have an end consonant

C-V-C = Standard syllable syntax (512)

Structures only end when specified or until parameters are saturated  
  
Nouns and verbs always require an end syllable as their length (unlike particles or indexes) are variable.

## Vocabulary   
[Click here for lexicon](lexicon.md) 

- [0,7]-[0,7]-0 = Particles (64) *cmavo*
	- [0,7]-0-0 = Numbers
- [0,7]-[0,7]-[1,7]Verbs (448) *brivla*
	- 0-[0,7]-[1,7] = Suffix (56) *rafsi*
	- [1,7]-0-[1,7] = Operators, flow control, and logic (49)
	- [1,7]-[1,7]-[1,7] = Normal verbs (343) *gimsu*


Quantitative suffixes 0-0-[0-7]

- 0	zero		"I'm not happy at all"
- 1	almost zero	"I'm almost not happy"
- 2	below usual	"I'm less happy than usual"
- 3	usual		"I'm as happy as usual"
- 4	above usual	"I'm more happy than usual"
- 5	almost max	"I'm almost maximally happy"
- 6	maximum		"I'm as happy as I can be"
- 7	infinite	"I'm as happy beyond understanding"

## Math  
NOT FINALIZED  

16777216	(big endian base 10)
100000000	(big endian base 8)  

011 101 100		(conlang0 big-endian HAN a.k.a hindu-arbic notation)  
  
translation  
011 = x1 ** 8 * x2  
101 = 8  
100 = 1  
  
:: 011 101 100 = 8 ** 8 * 1 = 16777216

