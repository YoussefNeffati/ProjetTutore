# ProjetTutore

Développer en JavaScript orienté objet (classes, héritage, etc. respectant les bonnes pratiques de JavaScript moderne), un ensemble de classes utilitaires et un éditeur interactif pour animer à 60 images seconde des objets suivant des courbes (quadriques, courbes de bézier), définies à la souris.

Scénario : on dessine une courbe à l’écran, avec des points de contrôle, la courbe apparaît. Puis ensuite on clique sur “animer un objet le long de cette courbe”, et on a un objet qui va suivre la courbe en suivant la courbure (il tourne sur lui-même pour toujours avoir comme direction la tangente à la courbe).
  ● On ajoutera un temps pour aller du point de départ au point d’arrivée, plus le temps est court, plus la vitesse est rapide.
  ● On essaiera de faire ralentir l’objet dans les virages prononcés (en gros, ajuster la vitesse en fonction de la courbure)
  ● On ajoutera une option pour "chaîner les courbes” et donc générer des animations plus complexes.
  ● Un ensemble de courbes aura un nom, ce sera le nom de l’animaton définie. Par exemple “attaque”, “rejoindreFormation”, “bougerEnFormation”

On pourra à la fin générer un objet JavaScript de type “animation” qui pourra être sauvegardé en JSON.
