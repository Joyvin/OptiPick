import gensim
from gensim import corpora
from gensim.models.ldamodel import LdaModel
from gensim.models.coherencemodel import CoherenceModel
from gensim.utils import simple_preprocess

tokenized = []

with open('./data/toothbrush.txt', 'r') as f:
    for line in f:
        tokenized.append(simple_preprocess(line, deacc=True))
print(tokenized)

id2word = corpora.Dictionary(tokenized)
corpus = [id2word.doc2bow(text) for text in tokenized]

num_topics = 10
passes = 100
iterations = 1000
eval_every = None 

lda_model = LdaModel(
    corpus=corpus,
    id2word=id2word,
    alpha='auto',
    eta='auto',
    iterations=iterations,
    num_topics=num_topics,
    passes=passes,
    eval_every=eval_every
)

coherence_model_lda = CoherenceModel(model=lda_model, texts=tokenized, dictionary=id2word, coherence='c_v')
coherence_lda = coherence_model_lda.get_coherence()

topics = lda_model.show_topics(num_topics=10, num_words=10)

for topic_id, topic_words in topics:
    print(f"Topic {topic_id}: {topic_words}")

print(f"Model Coherence Score: {coherence_lda:.4f}")
