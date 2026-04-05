import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import List "mo:core/List";

actor {
  type ScoreEntry = {
    playerName : Text;
    score : Nat;
    levelReached : Nat;
    timestamp : Time.Time;
  };

  module ScoreEntry {
    public func compare(a : ScoreEntry, b : ScoreEntry) : Order.Order {
      switch (Nat.compare(b.score, a.score)) {
        case (#equal) { Text.compare(a.playerName, b.playerName) };
        case (order) { order };
      };
    };
  };

  let scores = List.empty<ScoreEntry>();
  var totalGamesPlayed = 0;

  // Submit score (non-persistent)
  public shared ({ caller }) func submitScore(playerName : Text, score : Nat, levelReached : Nat) : async () {
    let scoreEntry : ScoreEntry = {
      playerName;
      score;
      levelReached;
      timestamp = Time.now();
    };
    scores.add(scoreEntry);
    totalGamesPlayed += 1;
  };

  public query ({ caller }) func getTopScores() : async [ScoreEntry] {
    let scoresArray = scores.toArray();
    let sortedScores = scoresArray.sort();
    if (sortedScores.size() <= 10) { return sortedScores };
    sortedScores.sliceToArray(0, 10);
  };

  public query ({ caller }) func getTotalGamesPlayed() : async Nat {
    totalGamesPlayed;
  };
};
