const Markov = require("./markov");

const text = `Tonight is the first time in a long time that I've talked to someone about my gender seriously. Mostly I'm deflecting, whether by being bombastic about it or avoiding it entirely. I was talking about my experiences in Austin, and my experiences at the sperm bank, taking HRT, and stopping.


  When I talked about stopping, I felt really sad. I haven't actually talked about this with anyone until Drew. I noticed that he got really quiet when I talked about that sadness, and that he was encouraging me to be more serious than some of the flippant energy that I had about my body and my transition. It was fun to bring in the chaotic energy of buying hormones from a shady internet marketplace, of thinking in terms of biohacking / DDoSing my endocrine system until it folded to my will. Transforming, pushing forward in a way that few others would ever get to experience.


  I talked about it like it's something normal; to feel that stopping HRT is a loss, that I'm stopping because I'm afraid of the consequences. I was surprised and a little worried that Drew seemed to be very concerned for me. I felt the same way I felt telling a therapist about my dad- like I should be sad, should be grieving, should be hurt but wasn't.


  Yet, that "I'm not hurt"- hearing it from anyone else feels like someone trying to convince themself. Even hearing it from myself, I get that reflexive sense. I'm afraid of what this means for me.


  I haven't continued to transition because I'm not sure if I really want to or not. If I want soft skin, don't I just moisturize? If I want to smell good, why not perfume? If I'm ambivalent about my body, why not diet and exercise?


  I don't know what I want from a partner, and I experienced stopping HRT almost like a breakup. My last relationship was an incredibly intense and brutal experience, which I'm still thinking about, and still deeply value. I have trouble opening up. There should be a connection here.


  Either way, it seems clear that I no longer really think of myself in terms of my AGAB. It just feels internally taken for granted that I'm not that. What it means to be something else, and the ways that it does or doesn't express itself- I really have no clue.


  I'm pulled in all kinds of different directions by my desires. I want a beautiful heterosexual atomic family. I want an unhinged queer existence in a series of depraved sexual limit-testing. I want to rapidly shift and change, taking forms that might seem monstrous to others. I want stability. I want the privilege of being cishet in tech and the opportunity to advance my career and increase my earnings. I want to be cruelly dismembered by a beautiful woman. I want to shower younger women with gifts.


  Not all of these are for good reasons, and I can only choose some of them, if any.`;

const m = new Markov();
m.addCorpus(text);

console.log(m.getSentence());
