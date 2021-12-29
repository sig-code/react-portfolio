import { useEffect, useState } from "react";
import axios from "axios";

export const Skills = () => {
  const [languageList, setLanguageList] = useState([]);
  console.log(languageList);

  // githubからrepositoryの言語を取得→整形して言語の種類とrepositoryの利用されてる主要言語の数を返す（使用数を返すので重複を許さない）
  useEffect(() => {
    axios
      .get("https://api.github.com/users/takuya-mashimo/repos")
      .then((repositories) => {
        const countedLanguageList = generatedLanguagesCountObj(
          repositories.data.map((repository) => repository.language)
        );
        setLanguageList(countedLanguageList);
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

  return (
    <div id='skills'>
      <div className='container'>
        <div className='heading'>
          <h2>Skills</h2>
        </div>
        <div className='skills-container'></div>
      </div>
    </div>
  );
};
