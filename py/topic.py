# Import necessary packages
import nltk
import spacy
import gensim
from gensim import corpora
from gensim.models.ldamodel import LdaModel
from gensim.models.coherencemodel import CoherenceModel
from gensim.utils import simple_preprocess

# Read and preprocess your text data
tokenized = []

with open('./review.txt', 'r') as f:
    for line in f:
        tokenized.append(simple_preprocess(line, deacc=True))

print(tokenized)

# Create a dictionary and a corpus
id2word = corpora.Dictionary(tokenized)
corpus = [id2word.doc2bow(text) for text in tokenized]

# print(id2word)

num_topics = 10
chunksize = 2000
passes = 20
iterations = 400
eval_every = None 

# Build the LDA model
lda_model = LdaModel(
    corpus=corpus,
    id2word=id2word,
    chunksize=chunksize,
    alpha='auto',
    eta='auto',
    iterations=iterations,
    num_topics=num_topics,
    passes=passes,
    eval_every=eval_every
)

# Infer topic distributions for new documents (you can replace this with your actual data)
new_doc_bow = [(1, 0.3), (2, 0.1), (0, 0.09)]
new_doc_lda = lda_model[new_doc_bow]

# Compute model perplexity and coherence score
coherence_model_lda = CoherenceModel(model=lda_model, texts=tokenized, dictionary=id2word, coherence='c_v')
coherence_lda = coherence_model_lda.get_coherence()

# Visualize the topics and their keywords
topics = lda_model.show_topics(num_topics=10, num_words=10)

# Map word indices to actual words
for topic_id, topic_words in topics:
    # print(topic_words)
    # words = [id2word[word_id] for word_id in topic_words] 
    # topic_words_str = ', '.join(words)
    print(f"Topic {topic_id}: {topic_words}")

print(f"Model Coherence Score: {coherence_lda:.4f}")
