$(function (){

  // preview用のテンプレートリテラル
  function preview(index, blob){
    const html = `
    <div class="image-preview" data-index="${index}">
      <img src="${blob}">
      <div class="buttons">
        <div class="edit">編集</div>
        <div class="delete">削除</div>
      </div>
    </div>
     `
    return html
  };

  // file_field生成用のメソッド
  function newFileField(index) {
    const file_field = `
    <br>
    <input accept="image/*" class="post-image" data-index="${index}" type="file" name="post[images_attributes][${index}][src]" id="post_images_attributes_${index}_src">
    `
    return file_field
  };

  // 灰色の部分がクリックされたらfile_fieldを呼び出す
  $('#select-button').on('click', function(e){
    const image_select = $('.post-image:last')  // lastにしておくことで、１番最後のfile_fieldが選択される
    image_select.trigger("click");  
  });

  // 【１】previewの生成と次のfile_fieldの生成
  $(document).on('change', '.post-image', function(e){
    const file = e.target.files[0]; // (e)の中にあるtarget.files[0]に追加したファイルがある
    const blob = window.URL.createObjectURL(file); // 取り込んだファイルのURLを取り出して変数blobに代入
    var index = $(this).data("index"); //次のfile_fieldを呼び出すためのカスタムデータ属性を取得

    // 画像編集時にプレビューを差し替える
    if ($(`.image-preview[data-index="${index}"]`)[0]) {  //[0]の中にカスタムデータを持ったimage-previewクラスかどうかで条件分岐
      // image-previewクラスの子要素のインライン要素imgを取得
      const edit_preview = $(`.image-preview[data-index="${index}"]`).children("img");
      edit_preview.attr("src", blob) // attrメソッドでsrcを新たに生成したblobに置き換え
      return false;  // 処理を中断。プレビューの追加とfile_fieldの追加を防止
    }
    const html = preview(index, blob) //previewメソッドに飛ばす
    $('#select-button').before(html);  // 作成したpreviewをviewに埋め込む
    index += 1;  //取得していたindexに1を足す
    const file_field = newFileField(index);  // newFileFieldメソッドに飛ばして次のfile_fieldを生成する
    $(".image-attatch").append(file_field);  // 生成したfile_fieldをimage-attachクラスに埋め込む
  });

  // 【２】削除ボタンが押された時の挙動
  $(document).on('click', '.delete', function(e) {
    // プレビュー画像を消去する
    // thisの中身は削除ボタンのブロックレベル要素。parentメソッドはノードを指定できる。プレビュー画像が属するクラスを指定する
    $(this).parents(".image-preview").remove(); // 削除ボタンが押されたプレビュー画像を消去する

    // チェックボックスにチェックを入れるコード
    const index = $(this).parents(".image-preview").data("index");  // 削除ボタンが押された画像プレビューのカスタムデータ属性を取得
  
    //チェックボックスのidは「post_images_attributes_0__destroy」となっているので、これを利用する
    $(`#post_images_attributes_${index}__destroy`).prop("checked", true); // チェックボックスにチェックを入れる
    $(`#post_images_attributes_${index}_src`).remove()  // file_fieldのidを取得して消去する
  })

  // 【３】編集ボタンが押された時の挙動
  $(document).on('click', '.edit', function(e) {
    const index = $(this).parents(".image-preview").data("index"); // 編集ボタンが押された画像のプレビューのカスタムデータ属性を取得
    $(`#post_images_attributes_${index}_src`).trigger("click"); // 取得したindexのfile_fieldを起動
  });
});