var Q1 = 0; 
var Q2 = 1;
var QM = new Array();
function BGLL( A , n ) {
  var Gn = new Array();
  var G = new Array();
  var E = new Array();
  var ki = new Array();
  var m = 0;
  var vn = n;
  for (var i = 0; i < n; i++) {
    ki[i] = 0;
    E[i]  = new Array();
    Gn[i] = i;
    for (var j = 0; j < n; j++) {
      m += A[i][j];
      ki[i] += A[i][j];
      if (A[i][j]==1) {
        E[i].push(j)
      }
    };  
  };
  Q1 = 0; 
  Q2 = 1;

  var count = 0;
  while (  count<10 && Math.round(Q1*1000)!=Math.round(Q2*1000) ) {
    count = count + 1;
    Q1 = Q2;
    QM = new Array();
    for (var v = 0; v < vn; v++) {
      i = v;
      QM[i] = new Array(); 
      var G = new Array();
      var max = -1;
      var maxQ = 0;
      for (var e = 0; e < E[i].length; e++) {
        j = E[i][e];
        if (i!=j) {
          G = new Array();
          for (var k = 0; k < vn; k++) {
            if (Gn[j]==Gn[k]) {
              G.push(k);
            }
          }
          QM[i][j] = dQ( A , i , ki[i], m  , G );
          if (QM[i][j]>maxQ && QM[i][j]>0) {
            max = j;
            maxQ = QM[i][j];
          }
        }
      };  
      if (max!=-1) {
        Gn[i]=Gn[max];
      }
    };

    Q2 = Q(A,Gn);   
    console.log(Q2);

  };

  
  return Gn;
}
function FEMB( A , n , condition) {
  var Gn = new Array();
  var G = new Array();
  var E = new Array();
  var ki = new Array();
  var m = 0;
  var vn = n;
  for (var i = 0; i < n; i++) {
    ki[i] = 0;
    E[i]  = new Array();
    Gn[i] = i;
    for (var j = 0; j < n; j++) {
      m += A[i][j];
      ki[i] += A[i][j];
      if (A[i][j]==1) {
        E[i].push(j)
      }
    };  
  };
  Q1 = 0; 
  Q2 = 1;
  var count = 0;
  var flag3 = true;
  while (  count<10 && Math.round(Q1*1000)!=Math.round(Q2*1000) && flag3) {
    count = count + 1;
    Q1 = Q2;
    QM = new Array();
    for (var v = 0; v < vn; v++) {
      i = v;
      QM[i] = new Array(); 
      var G = new Array();
      var max = -1;
      var maxQ = 0;
      for (var e = 0; e < E[i].length; e++) {
        j = E[i][e];
        if (i!=j) {
          G = new Array();
          for (var k = 0; k < vn; k++) {
            if (Gn[j]==Gn[k]) {
              G.push(k);
            }
          }
          QM[i][j] = dQ( A , i , ki[i], m  , G );
          if (QM[i][j]>maxQ && QM[i][j]>0) {
            var flag = false;
            var flag2 = true;             
            for (var c = 0; c < 3; c++) {
              if (condition[c][0]!=-1 && condition[c][1]!=-1) {
                if ((i==condition[c][0] && Gn[condition[c][1]]!=Gn[j]) || (i==condition[c][1] && Gn[condition[c][0]]!=Gn[j]) ) {
                  flag = true;
                }
              }
              if ((i==condition[c][0] || i==condition[c][1])) {
                flag2 = false;
              }
            }
            if ( flag == true || flag2 == true ) {
              max = j;
              maxQ = QM[i][j];
            }
          }
        }
      };  
      if (max!=-1) {
        Gn[i]=Gn[max];
      }
    };

    Q2 = Q(A,Gn);
    
    for (var c=0; c<3; c++) {
      if (condition[c][0]!=-1 && condition[c][1]!=-1 && Gn[condition[c][0]] == Gn[condition[c][1]]) {
        flag3 = false;
      }
    }

  };

  
  return Gn;
}
function Q( A , G) {
  var sumTot = 0;
  var sumIn = 0;
  var m = 0;
  for (var i = 0; i < A.length; i++) {
    for (var j = 0; j < A.length; j++) {
      m += A[i][j];
    };  
  };
  m = m / 2;
  var Q = 0;
  var Gu = new Array();
  for (var n=0; n<G.length; n++) {
    if (Gu.indexOf(G[n])==-1) {
      Gu.push(G[n]);
    }
  }
  for (var n=0; n<Gu.length; n++) {
    var Gn = new Array();
    for (var k = 0; k < A.length; k++) {
      if (Gu[n]==G[k]) {
        Gn.push(k);
      }
    }
    sumTot = 0;
    sumIn = 0;
    for (var i = 0; i < Gn.length; i++) {
      for (var j = 0; j < A.length; j++) {
        sumTot += A[j][Gn[i]];
      }
    }
    for (var i = 0; i < Gn.length; i++) {
        for (var j = 0; j < Gn.length; j++) {
          sumIn += A[Gn[i]][Gn[j]];
        }
    }
    sumIn = sumIn / 2; 
    sumTot = sumTot / 2;
    if (sumTot>0) {
      Q += ((sumIn/m) - (Math.pow((sumTot/m),2)));
    }
  }
  return Q;
}
function GQ( A , G) {
  
  var sumTot = 0;
  var sumIn = 0;
  var m = 0;
  for (var i = 0; i < A.length; i++) {
    for (var j = 0; j < A.length; j++) {
      m += A[i][j];
    };  
  };
  m = (m/2);
  var Q = 0;
  sumTot = 0;
  sumIn = 0;
  for (var i = 0; i < G.length; i++) {
    for (var j = 0; j < A.length; j++) {
      sumTot += A[j][G[i]];
    }
  }
  for (var i = 0; i < G.length; i++) {
    for (var j = 0; j < G.length; j++) {
      sumIn += A[G[i]][G[j]];
    }
  }
  sumIn = sumIn / 2; 
  sumTot = sumTot / 2;
  if (sumTot>0) {
    Q = ((sumIn/m) - (Math.pow((sumTot/m),2)));
  }
  
  return Q;
}
function dQ( A , n , ki, m , G) {
  
  var sumTot = 0;
  var sumIn = 0;
  var ki_in = 0;
  var dQ = 0;
  for (var i = 0; i < G.length; i++) {
    for (var j = 0; j < A.length; j++) {
      sumTot += A[j][G[i]];
    }
  }
  for (var i = 0; i < G.length; i++) {
    ki_in += A[n][G[i]];
    for (var j = 0; j < G.length; j++) {
      sumIn += A[G[i]][G[j]];
    } 
    
  }
  var dQ = (((sumIn+ki_in)/(2*m))-(Math.pow(((sumTot+ki)/(2*m)),2)))-((sumIn/(2*m))-Math.pow((sumTot/(2*m)),2)-Math.pow((ki/(2*m)),2));

  return dQ;
}
