
# This is how client and server communicate with each other

Note: You need to have Mermaid extension installed in your markdown editor to see the diagram


``` mermaid
sequenceDiagram
    front ->> back: GET /authenticate {access_code}
    back -->> front: Validate JWT {scope}

    front ->> back: GET /categories
    back -->> front: Categories[{id,name}]


    loop Get questions untill remaining question > 0

        front ->>+ back: GET /next-question {category_id,difficulty} 
        back -->>- front: Question[{id,question,options:[]}]

        front ->>+ back: POST /answer {question_id,answer}
        back -->>- front: Answer[{correct,corrent_score,remaining_questions}]

    end

    front ->>+ back: GET /score
    back -->>- front: Score[{score, answers:[{question,currect_answer,selected_answer,correct}]}]
    

```