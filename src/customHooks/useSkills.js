import { useEffect, useReducer } from "react";
import axios from "axios";
import {
  skillReducer,
  initialState,
  actionTypes,
} from "../reducers/skillReducer";

export const useSkills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState);
  // githubからrepositoryの言語を取得→整形して言語の種類とrepositoryの利用されてる主要言語の数を返す（使用数を返すので重複を許さない）
  useEffect(() => {
    dispatch({ type: actionTypes.fetch });
    axios
      .get("https://api.github.com/users/takuya-mashimo/repos")
      .then((repositories) => {
        const countedLanguageList = generatedLanguagesCountObj(
          repositories.data.map((repository) => repository.language)
        );

        dispatch({
          type: actionTypes.success,
          payload: { languageList: countedLanguageList },
        });
      })
      .catch(() => {
        dispatch({ type: actionTypes.error });
      });
  }, []);

  const generatedLanguagesCountObj = (allLanguages) => {
    const notNullLanguages = allLanguages.filter(
      (language) => language !== null
    );
    const uniqueLanguages = [...new Set(notNullLanguages)];

    return uniqueLanguages.map((item) => {
      return {
        language: item,
        // 一意にした配列とすべてのリポジトリにある言語の配列の一致するもの判定して、一致した言語の配列を作成→lengthでどれだけの要素数がを数えてる
        count: allLanguages.filter((language) => language === item).length,
      };
    });
  };

  const converseCountToPercentage = (count) => {
    if (count > 10) {
      return 100;
    }
    return count * 10;
  };

  const sortedLanguageList = () =>
    state.languageList.sort(
      (firstLang, nextLang) => nextLang.count - firstLang.count
    );

  return [sortedLanguageList, state.requestState, converseCountToPercentage];
};
