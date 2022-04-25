Feature: insurance purchase area

  Scenario: As a customer, I can purchase a insurance


    Given I am on the insurance sales page
    When I choose a plan to be contracted with value "26,001" fill in the information
    Then insurance will be taken out


  Scenario: As a customer, I can purchase a insurance with random value

    #informar o valor do plano entre aspas, deixando vazio ou com um valor inválido
    # os valores serão selecionados de forma aleatória
    Given I am on the insurance sales page
    When I choose a plan to be contracted with value "" fill in the information
    Then insurance will be taken out